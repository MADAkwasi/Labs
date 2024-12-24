import { Component, ElementRef, inject, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-form',
  imports: [TextComponent, ButtonComponent, IconComponent, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly elementRef = inject(ElementRef);
  private readonly fb = inject(FormBuilder);
  isOpened!: boolean;
  invoiceForm!: FormGroup;

  ngOnInit(): void {
    this.invoiceForm = this.fb.group({
      id: [''],
      createdAt: [new Date()],
      paymentDue: ['', Validators.required],
      paymentTerms: ['', Validators.required],
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
    });

    this.setupItemTotalCalculation();
  }

  createItem(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0.01)]],
      total: [{ value: 0, disabled: true }],
    });
  }

  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  addItem(): void {
    this.items.push(this.createItem());
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  setupItemTotalCalculation(): void {
    this.items.controls.forEach((control) => {
      const itemFormGroup = control as FormGroup;
      itemFormGroup
        .get('quantity')
        ?.valueChanges.subscribe(() => this.updateItemTotal(itemFormGroup));
      itemFormGroup
        .get('price')
        ?.valueChanges.subscribe(() => this.updateItemTotal(itemFormGroup));
    });

    this.items.valueChanges.subscribe(() => {
      this.items.controls.forEach((control) => {
        const itemFormGroup = control as FormGroup;
        itemFormGroup
          .get('quantity')
          ?.valueChanges.subscribe(() => this.updateItemTotal(itemFormGroup));
        itemFormGroup
          .get('price')
          ?.valueChanges.subscribe(() => this.updateItemTotal(itemFormGroup));
      });
    });
  }

  updateItemTotal(item: FormGroup): void {
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
  }
}
