import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvoicesComponent } from './invoices.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {
  selectAllInvoices,
  selectLoadingState,
} from '../../state/selectors/invoice.selector';
import { invoiceActions } from '../../state/actions/invoice.action';

describe('InvoicesComponent', () => {
  let component: InvoicesComponent;
  let fixture: ComponentFixture<InvoicesComponent>;
  let debugElement: DebugElement;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoicesComponent],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectAllInvoices, value: [] },
            { selector: selectLoadingState, value: false },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoicesComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    store = TestBed.inject(MockStore);
    jest.spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the headline component', () => {
    const headlineElement = debugElement.query(
      By.css('app-headline')
    ).nativeElement;
    expect(headlineElement).toBeTruthy();
  });

  it('should display empty state when no invoices are available', () => {
    store.overrideSelector(selectAllInvoices, []);
    store.overrideSelector(selectLoadingState, false);
    fixture.detectChanges();
    const emptyStateElement = debugElement.query(
      By.css('app-icon[altText="no-invoices"]')
    ).nativeElement;
    expect(emptyStateElement).toBeTruthy();
  });

  it('should dispatch loadInvoices action if not loading and no invoices', () => {
    store.overrideSelector(selectAllInvoices, []);
    store.overrideSelector(selectLoadingState, false);
    fixture.detectChanges();
    expect(store.dispatch).toHaveBeenCalledWith(invoiceActions.loadInvoices());
  });
});
