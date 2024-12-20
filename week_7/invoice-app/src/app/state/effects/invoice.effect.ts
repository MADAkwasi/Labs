import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { invoiceActions } from '../actions/invoice.action';
import { switchMap, map, catchError, of } from 'rxjs';
import { Invoice } from '../../data/model';

@Injectable({
  providedIn: 'root',
})
export class InvoiceEffect {
  constructor(
    private readonly actions$: Actions,
    private readonly http: HttpClient
  ) {}

  loadInvoices$ = createEffect(() => {
    const { loadInvoices, loadInvoicesFailure, loadInvoicesSuccess } =
      invoiceActions;

    return this.actions$.pipe(
      ofType(loadInvoices),
      switchMap(() =>
        this.http.get<Invoice[]>('./../../data/data.json').pipe(
          map((invoices) => loadInvoicesSuccess({ invoices })),
          catchError((error) => of(loadInvoicesFailure({ error })))
        )
      )
    );
  });
}
