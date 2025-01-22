import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Invoice } from '../assets/data/model';

export const INVOICES_API =
  'https://invoice-app-bknd-strapi-cloud.onrender.com/';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private readonly http = inject(HttpClient);

  loadInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(INVOICES_API + 'invoices').pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  addInvoice(invoice: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>(`${INVOICES_API}/invoices`, invoice).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  updateInvoice(invoice: Invoice): Observable<Invoice> {
    return this.http
      .put<Invoice>(`${INVOICES_API}/invoices/${invoice.id}`, invoice)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  deleteInvoice(invoiceId: string): Observable<void> {
    return this.http.delete<void>(`${INVOICES_API}/invoices/${invoiceId}`).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}
