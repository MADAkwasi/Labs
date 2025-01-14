import { inject, Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { invoiceActions } from '../actions/invoice.action';
import { switchMap, map, of, catchError } from 'rxjs';
import { InvoiceService } from '../../invoice.service';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class InvoiceEffect {
  private readonly actions$ = inject(Actions);
  private readonly invoiceService = inject(InvoiceService);

  loadInvoices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invoiceActions.loadInvoices),
      switchMap(() =>
        this.invoiceService.loadInvoices().pipe(
          map((invoices) => invoiceActions.loadInvoicesSuccess({ invoices })),
          catchError((error) =>
            of(invoiceActions.loadInvoicesFailure({ error }))
          )
        )
      )
    )
  );
}
