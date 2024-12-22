import { Component, inject, OnInit } from '@angular/core';
import { HeadlineComponent } from '../../components/headline/headline.component';
import { Store } from '@ngrx/store';
import { invoiceActions } from '../../state/actions/invoice.action';
import { selectLoadingState } from '../../state/selectors/invoice.selector';
import { InvoiceCardComponent } from '../../components/invoice-card/invoice-card.component';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [HeadlineComponent, InvoiceCardComponent],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.css',
})
export class InvoicesComponent implements OnInit {
  private readonly store = inject(Store);
  isLoading = this.store.selectSignal(selectLoadingState);

  ngOnInit(): void {
    this.store.dispatch(invoiceActions.loadInvoices());
  }
}
