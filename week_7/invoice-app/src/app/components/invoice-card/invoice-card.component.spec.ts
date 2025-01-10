import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvoiceCardComponent } from './invoice-card.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {
  selectFilteredInvoices,
  selectLoadingState,
} from '../../state/selectors/invoice.selector';

describe('InvoiceCardComponent', () => {
  let component: InvoiceCardComponent;
  let fixture: ComponentFixture<InvoiceCardComponent>;
  let debugElement: DebugElement;
  let store: MockStore;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceCardComponent],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectFilteredInvoices,
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
            { selector: selectLoadingState, value: false },
          ],
        }),
        { provide: Router, useValue: { navigate: jest.fn() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoiceCardComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render invoice details', () => {
    const invoiceElement = debugElement.query(
      By.css('.left app-text[type="emphasis"]')
    ).nativeElement;
    expect(invoiceElement.textContent).toContain('#1');
  });

  it('should call handleNavigate when the invoice is clicked', () => {
    jest.spyOn(component, 'handleNavigate');
    const invoiceElement = debugElement.query(By.css('div')).nativeElement;
    invoiceElement.click();
    fixture.detectChanges();
    expect(component.handleNavigate).toHaveBeenCalledWith('1');
  });

  it('should navigate to invoice details when handleNavigate is called', () => {
    component.handleNavigate('1');
    expect(router.navigate).toHaveBeenCalledWith(['/invoice', '1']);
  });
});
