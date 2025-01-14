import {
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TextComponent } from '../text/text.component';
import { ButtonComponent } from '../button/button.component';
import { Store } from '@ngrx/store';
import { interactionsActions } from '../../state/actions/interactions.action';
import { IconComponent } from '../icon/icon.component';
import { Invoice, Item } from '../../../assets/data/model';
import { CommonModule } from '@angular/common';
import { invoiceActions } from '../../state/actions/invoice.action';
import { addDays } from 'date-fns';
import { selectActiveInvoice } from '../../state/selectors/invoice.selector';
import {
  selectDarkModeState,
  selectEditState,
} from '../../state/selectors/interactions.selector';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { FormService } from './form.service';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    TextComponent,
    ButtonComponent,
    IconComponent,
    ReactiveFormsModule,
    CommonModule,
    DatePickerComponent,
    DropdownComponent,
  ],
  providers: [FormService],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly elementRef = inject(ElementRef);
  private readonly fb = inject(FormBuilder);
  private readonly formService = inject(FormService);
  private readonly toastr = inject(ToastrService);
  invoiceForm!: FormGroup;
  paymentTerms = signal<number>(1);
  selectedInvoice = this.store.selectSignal(selectActiveInvoice);
  selectedInvoiceCopy!: Invoice;
  isEditingForm = this.store.selectSignal(selectEditState);
  isDarkMode = this.store.selectSignal(selectDarkModeState);
  paymentDue = computed(() => {
    const createdAt = this.invoiceForm?.get('createdAt')?.value || new Date();
    return addDays(new Date(createdAt), this.paymentTerms());
  });
  itemsCount = signal<number>(0);
  itemsArray = computed(() =>
    new Array<Item>(this.itemsCount()).fill({
      name: '',
      quantity: 1,
      price: 0,
      total: 0,
    })
  );
  isHovered!: boolean;
  isFormSubmitted!: boolean;
  deviceWidth: number = window.innerWidth;

  ngOnInit(): void {
    this.invoiceForm = this.fb.group({
      id: [this.formService.generateId()],
      createdAt: [new Date(), Validators.required],
      paymentDue: ['', Validators.required],
      description: ['', Validators.required],
      paymentTerms: [1, Validators.required],
      clientName: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z ]*$')],
      ],
      clientEmail: ['', [Validators.required, Validators.email]],
      status: ['pending'],
      senderAddress: this.fb.group({
        street: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
        city: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
        postCode: ['', Validators.required],
        country: [
          '',
          [Validators.required, Validators.pattern('^[a-zA-Z ]*$')],
        ],
      }),
      clientAddress: this.fb.group({
        street: ['', Validators.required],
        city: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
        postCode: ['', Validators.required],
        country: [
          '',
          [Validators.required, Validators.pattern('^[a-zA-Z ]*$')],
        ],
      }),
      items: this.fb.array([this.createItem()]),
      total: [{ value: 0 }],
    });

    this.calculatePaymentDueDate();

    this.setupItemTotalCalculation();

    this.setupPaymentTermsSync();

    if (this.isEditingForm()) {
      this.populateForm(this.selectedInvoice() as Invoice);
      this.selectedInvoiceCopy = this.selectedInvoice() as Invoice;
    }

    this.invoiceForm.valueChanges.subscribe((formValue) => {
      this.syncFormWithStore(formValue);
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.deviceWidth = window.innerWidth;
  }

  private syncFormWithStore(formValue: any, parentPath: string[] = []): void {
    Object.keys(formValue).forEach((key) => {
      const path = [...parentPath, key];
      const control = this.invoiceForm.get(path.join('.'));

      if (control?.value !== undefined && control.dirty) {
        this.updateField(path, control.value);
      }

      if (
        typeof formValue[key] === 'object' &&
        !Array.isArray(formValue[key])
      ) {
        this.syncFormWithStore(formValue[key], path);
      }
    });
  }

  private resetFormAndClose(): void {
    this.invoiceForm.reset();
    this.itemsCount.set(0);
    this.items.clear();
    this.store.dispatch(interactionsActions.closeForm());
  }

  private updateFormTotal(): void {
    const total = this.items.controls.reduce((sum, item) => {
      const quantity = item.get('quantity')?.value || 0;
      const price = item.get('price')?.value || 0;
      return sum + quantity * price;
    }, 0);
    this.invoiceForm.get('total')?.setValue(total, { emitEvent: false });
  }

  createItem(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required]],
      total: [{ value: 0, disabled: true }],
    });
  }

  get items(): FormArray<FormGroup> {
    return this.invoiceForm.get('items') as FormArray<FormGroup>;
  }

  get createdAtControl(): FormControl {
    return this.invoiceForm.get('createdAt') as FormControl;
  }

  populateForm(invoice: Invoice): void {
    this.invoiceForm.patchValue(invoice);

    const itemsControl = this.invoiceForm.get('items') as FormArray;
    itemsControl.clear();

    if (invoice.items) {
      invoice.items.forEach((item) => {
        itemsControl.push(
          this.fb.group({
            name: [item.name, Validators.required],
            quantity: [item.quantity, [Validators.required, Validators.min(1)]],
            price: [item.price, [Validators.required]],
            total: [{ value: item.total, disabled: true }],
          })
        );
      });
    }

    this.itemsCount.set(invoice.items?.length || 0);
  }

  setupItemTotalCalculation(): void {
    const itemsArray = this.items;

    itemsArray.controls.forEach((control) => {
      const quantityControl = control.get('quantity');
      const priceControl = control.get('price');

      if (quantityControl && priceControl) {
        quantityControl.valueChanges.subscribe(() =>
          this.updateItemTotal(control)
        );
        priceControl.valueChanges.subscribe(() =>
          this.updateItemTotal(control)
        );
      }
    });

    itemsArray.valueChanges.subscribe((items) => {
      const total = items.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );
      this.invoiceForm.get('total')?.setValue(total, { emitEvent: false });
    });
  }

  setupPaymentTermsSync(): void {
    const paymentTermsControl = this.invoiceForm.get('paymentTerms');
    const createdAtControl = this.invoiceForm.get('createdAt');

    if (paymentTermsControl && createdAtControl) {
      paymentTermsControl.valueChanges.subscribe((value) => {
        const numericValue = Number(value);
        if (!isNaN(numericValue)) {
          this.paymentTerms.set(numericValue);
        }
      });

      paymentTermsControl.valueChanges.subscribe(() => this.updatePaymentDue());
      createdAtControl.valueChanges.subscribe(() => this.updatePaymentDue());

      this.updatePaymentDue();
    }
  }

  updatePaymentDue(): void {
    const createdAt = this.invoiceForm.get('createdAt')?.value || new Date();
    const paymentDueDate = addDays(new Date(createdAt), this.paymentTerms());
    this.invoiceForm
      .get('paymentDue')
      ?.setValue(paymentDueDate, { emitEvent: false });
  }

  calculatePaymentDueDate() {
    this.invoiceForm
      .get('paymentTerms')
      ?.valueChanges.subscribe((terms: number) => {
        const createdAt = this.invoiceForm.get('createdAt')?.value;
        if (createdAt) {
          const paymentDue = addDays(createdAt, terms);
          this.invoiceForm
            .get('paymentDue')
            ?.setValue(paymentDue, { emitEvent: false });
        }
      });
  }

  updateItemTotal(item: FormGroup): void {
    const quantity = item.get('quantity')?.value || 0;
    const price = item.get('price')?.value || 0;
    const total = quantity * price;

    item.get('total')?.setValue(total, { emitEvent: false });
  }

  updateTotal(index: number): void {
    const item = this.items.at(index);
    const quantity = item.get('quantity')?.value || 0;
    const price = item.get('price')?.value || 0;
    const total = quantity * price;
    item.get('total')?.setValue(total, { emitEvent: false });
  }

  updateField(path: string[], value: any): void {
    this.store.dispatch(invoiceActions.editField({ path, value }));
  }

  onDateChange(selectedDate: Date | null): void {
    const control = this.invoiceForm.get('createdAt');
    control?.setValue(selectedDate);
    control?.markAsDirty();
  }

  getNativeElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  handleDiscard(): void {
    if (this.isEditingForm()) {
      this.populateForm(this.selectedInvoiceCopy);
      this.store.dispatch(interactionsActions.closeForm());
    } else this.resetFormAndClose();
  }

  handleAddItem(): void {
    this.items.push(this.createItem());
    this.updateFormTotal();
  }

  handleDeleteItem(index: number): void {
    this.items.removeAt(index);
    this.updateFormTotal();
  }

  handleDraft(): void {
    const invoice = this.invoiceForm.getRawValue();
    invoice.status = 'draft';

    if (this.isEditingForm())
      this.store.dispatch(invoiceActions.updateInvoice({ invoice }));
    else this.store.dispatch(invoiceActions.addInvoice({ invoice }));

    this.resetFormAndClose();

    this.toastr.success(`Invoice #${invoice.id} saved as draft successfully`);
  }

  handleSend(): void {
    this.isFormSubmitted = true;

    if (!this.invoiceForm.valid) return;

    const invoice = this.invoiceForm.getRawValue();

    if (this.isEditingForm()) {
      this.store.dispatch(invoiceActions.updateInvoice({ invoice }));
      this.toastr.success(`Invoice #${invoice.id} edited successfully`);
    } else {
      this.store.dispatch(invoiceActions.addInvoice({ invoice }));
      this.toastr.success(`Invoice #${invoice.id} sent successfully`);
    }

    this.resetFormAndClose();
    this.isFormSubmitted = false;
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.invoiceForm.get(controlName);
    return (this.isFormSubmitted && control?.hasError(errorName)) ?? false;
  }

  getFormControls(formGroup: FormGroup): AbstractControl[] {
    const controls: AbstractControl[] = [];
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      if (control instanceof FormGroup) {
        controls.push(...this.getFormControls(control));
      } else if (control) {
        controls.push(control);
      }
    });
    return controls;
  }

  getErrorMessage(control: AbstractControl): string {
    if (control.errors?.['required']) {
      return 'Required fields missing';
    } else if (control.errors?.['pattern']) {
      return 'Invalid format';
    } else if (control.errors?.['email']) {
      return 'Invalid email';
    }
    return 'Invalid field';
  }

  onSubmit() {}
}
