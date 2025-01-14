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
        console.error('Error loading invoices', error);
        return throwError(error);
      })
    );
  }
}
