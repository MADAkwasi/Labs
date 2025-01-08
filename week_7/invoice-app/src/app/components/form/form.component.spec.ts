import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { FormComponent } from './form.component';
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
});
