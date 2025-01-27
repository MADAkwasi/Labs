import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvoiceComponent } from './invoice.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { selectDeleteState } from '../../state/selectors/interactions.selector';
import {
  selectAllInvoices,
  selectFilterState,
} from '../../state/selectors/invoice.selector';
import { interactionsActions } from '../../state/actions/interactions.action';
import { invoiceActions } from '../../state/actions/invoice.action';

describe('InvoiceComponent', () => {
  let component: InvoiceComponent;
  let fixture: ComponentFixture<InvoiceComponent>;
  let debugElement: DebugElement;
  let store: MockStore;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceComponent],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectAllInvoices,
              value: [
                {
                  id: '1',
                  paymentDue: new Date(),
                  clientName: 'Client A',
                  total: 100,
                  status: 'paid',
                },
              ],
            },
            { selector: selectFilterState, value: false },
            { selector: selectDeleteState, value: false },
          ],
        }),
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { id: '1' } } },
        },
        { provide: Router, useValue: { navigate: jest.fn() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoiceComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    jest.spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to dashboard when handleNavigateBack is called', () => {
    component.handleNavigateBack();
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should dispatch editForm action when handleEditInvoice is called', () => {
    component.handleEditInvoice();
    expect(store.dispatch).toHaveBeenCalledWith(interactionsActions.editForm());
  });

  it('should dispatch handleDelete action when onClickDeleteBtn is called', () => {
    component.onClickDeleteBtn();
    expect(store.dispatch).toHaveBeenCalledWith(
      interactionsActions.handleDelete()
    );
  });

  it('should dispatch updateInvoiceStatus action when onChangeStatus is called', () => {
    component.onChangeStatus('draft');
    expect(store.dispatch).toHaveBeenCalledWith(
      invoiceActions.updateInvoiceStatus({
        invoiceId: '1',
        status: 'paid',
      })
    );
  });

  it('should update deviceWidth on window resize', () => {
    const resizeEvent = new Event('resize');
    window.innerWidth = 800;
    window.dispatchEvent(resizeEvent);
    fixture.detectChanges();
    expect(component.deviceWidth).toBe(800);
  });

  it('should not display delete card when wantsToDelete is false', () => {
    store.overrideSelector(selectDeleteState, false);
    store.refreshState();
    fixture.detectChanges();
    const deleteCard = debugElement.query(By.css('app-delete-card'));
    expect(deleteCard).toBeFalsy();
  });
});
