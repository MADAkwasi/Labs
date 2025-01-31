import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice, invoiceStatus } from '../assets/data/model';

export const INVOICES_API =
  'https://invoice-app-bknd-strapi-cloud.onrender.com/';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private readonly http = inject(HttpClient);

  loadInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(INVOICES_API + 'invoices');
  }

  addInvoice(invoice: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>(`${INVOICES_API}invoices`, invoice);
  }

  updateInvoice(invoice: Invoice): Observable<Invoice> {
    return this.http.put<Invoice>(
      `${INVOICES_API}invoices/${invoice.id}`,
      invoice
    );
  }

  deleteInvoice(invoiceId: string): Observable<void> {
    return this.http.delete<void>(`${INVOICES_API}invoices/${invoiceId}`);
  }

  updateInvoiceStatus(
    invoiceId: string,
    status: invoiceStatus
  ): Observable<Invoice> {
    return this.http.put<Invoice>(`${INVOICES_API}invoices/${invoiceId}`, {
      status,
    });
  }
}
