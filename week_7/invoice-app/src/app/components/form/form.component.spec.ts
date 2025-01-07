import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl, FormArray } from '@angular/forms';
import { FormComponent } from './form.component';
import { Invoice, invoiceStatus } from '../../../assets/data/model';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { selectActiveInvoice } from '../../state/selectors/invoice.selector';
import {
  selectDarkModeState,
  selectEditState,
} from '../../state/selectors/interactions.selector';
describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormComponent],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectActiveInvoice, value: null },
            { selector: selectEditState, value: false },
            { selector: selectDarkModeState, value: false },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return createdAt form control', () => {
    const control = component.createdAtControl;
    expect(control).toBeInstanceOf(FormControl);
  });

  it('should generate a valid ID', () => {
    const id = component.generateId();
    expect(id).toMatch(/^[A-Z]{2}\d{4}$/);
  });

  //   it('should populate the form with invoice data', () => {
  //     const invoice: Invoice = {
  //       id: 'AB1234',
  //       createdAt: '2023-01-01',
  //       paymentDue: '2023-01-15',
  //       description: 'Test Invoice',
  //       paymentTerms: 30,
  //       clientName: 'John Doe',
  //       clientEmail: 'john.doe@example.com',
  //       status: 'pending' as invoiceStatus,
  //       senderAddress: {
  //         street: '123 Main St',
  //         city: 'Anytown',
  //         postCode: '12345',
  //         country: 'USA',
  //       },
  //       clientAddress: {
  //         street: '456 Elm St',
  //         city: 'Othertown',
  //         postCode: '67890',
  //         country: 'USA',
  //       },
  //       items: [{ name: 'Item 1', quantity: 1, price: 100, total: 100 }],
  //       total: 100,
  //     };
  //     component.populateForm(invoice);
  //     const formValue = component.invoiceForm.value;
  //     formValue.paymentDue = formValue.paymentDue.toISOString().split('T')[0]; // Convert Date to string
  //     expect(formValue).toEqual({
  //       ...invoice,
  //       paymentDue: '2023-01-15',
  //     });
  //     const itemsControl = component.invoiceForm.get('items') as FormArray;
  //     expect(itemsControl.length).toBe(1);
  //     expect(itemsControl.at(0).value).toEqual(invoice.items[0]);
  //   });
});
