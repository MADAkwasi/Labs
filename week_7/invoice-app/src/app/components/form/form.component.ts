import {
  Component,
  computed,
  ElementRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
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
import { selectEditState } from '../../state/selectors/interactions.selector';

@Component({
  selector: 'app-form',
  imports: [
    TextComponent,
    ButtonComponent,
    IconComponent,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly elementRef = inject(ElementRef);
  private readonly fb = inject(FormBuilder);
  isOpened!: boolean;
  invoiceForm!: FormGroup;
  paymentTerms = signal<number>(1);
  selectedInvoice = this.store.selectSignal(selectActiveInvoice);
  isEditingForm = this.store.selectSignal(selectEditState);
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

  ngOnInit(): void {
    this.invoiceForm = this.fb.group({
      id: [this.generateId()],
      createdAt: [new Date()],
      paymentDue: ['', Validators.required],
      description: ['', Validators.required],
      paymentTerms: [1, Validators.required],
      clientName: ['', Validators.required],
      clientEmail: ['', [Validators.required, Validators.email]],
      status: ['pending'],
      senderAddress: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        postCode: ['', Validators.required],
        country: ['', Validators.required],
      }),
      clientAddress: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        postCode: ['', Validators.required],
        country: ['', Validators.required],
      }),
      items: this.fb.array([this.createItem()]),
      total: [{ value: 0 }],
    });

    this.calculatePaymentDueDate();

    this.setupItemTotalCalculation();

    this.setupPaymentTermsSync();

    if (this.isEditingForm())
      this.populateForm(this.selectedInvoice() as Invoice);
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

  generateId(): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomLetters = Array.from({ length: 2 }, () =>
      letters.charAt(Math.floor(Math.random() * letters.length))
    ).join('');

    const randomDigits = Math.floor(1000 + Math.random() * 9000).toString();

    return `${randomLetters}${randomDigits}`;
  }

  // addItem(): void {
  //   this.items.push(this.createItem());
  // }

  // removeItem(index: number): void {
  //   this.items.removeAt(index);
  // }

  populateForm(invoice: Invoice) {
    this.invoiceForm.patchValue(invoice);

    const itemsControl = this.invoiceForm.get('items') as FormArray;
    if (itemsControl && invoice.items) {
      invoice.items.forEach((item, i) => {
        if (i !== 0)
          return itemsControl.push(
            this.fb.group({
              name: [item.name],
              quantity: [item.quantity],
              price: [item.price],
              total: [item.total],
            })
          );
      });
    }

    console.log(itemsControl);
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

  toggleDropdown() {
    this.isOpened = !this.isOpened;
  }

  getNativeElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  handleDiscard(): void {
    this.store.dispatch(interactionsActions.closeForm());
    this.invoiceForm.reset();
  }

  handleAddItem(): void {
    if (this.isEditingForm()) this.store.dispatch(invoiceActions.addItem());

    this.itemsCount.update((count) => count + 1);
    this.items.push(this.createItem());
  }

  handleDraft(): void {
    this.invoiceForm.get('status')?.setValue('draft', { emitEvent: false });
    this.items.removeAt(this.items.length - 1);
    this.store.dispatch(
      invoiceActions.addInvoice({ invoice: this.invoiceForm.getRawValue() })
    );
    this.invoiceForm.reset();
    this.store.dispatch(interactionsActions.closeForm());
  }

  handleSend(): void {
    this.store.dispatch(interactionsActions.closeForm());
    this.items.removeAt(this.items.length - 1);
    this.store.dispatch(
      invoiceActions.addInvoice({ invoice: this.invoiceForm.getRawValue() })
    );
    this.invoiceForm.reset();
    this.itemsCount.set(0);
    this.items.clear();
  }

  handleDeleteItem(): void {
    this.itemsCount.update((count) => count - 1);
  }

  onSubmit() {
    console.log(this.invoiceForm.value);
  }
}
