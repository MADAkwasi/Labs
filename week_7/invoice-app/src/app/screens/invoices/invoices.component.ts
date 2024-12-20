import { Component, inject, OnInit } from '@angular/core';
import { HeadlineComponent } from '../../components/headline/headline.component';
import { Store } from '@ngrx/store';
import { invoiceActions } from '../../state/actions/invoice.action';
import { selectAllInvoices } from '../../state/selectors/invoice.selector';
import { InvoiceService } from '../../invoice.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [HeadlineComponent],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.css',
})
export class InvoicesComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly invoiceService = inject(InvoiceService);
  invoices = this.store.selectSignal(selectAllInvoices);

  ngOnInit(): void {
    this.store.dispatch(invoiceActions.loadInvoices());
  }
}
