import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import invoicesData from '../assets/data/data.json';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  constructor() {}

  loadInvoices(): Observable<any> {
    return of(invoicesData);
  }
}
