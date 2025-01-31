import { inject, Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { invoiceActions } from '../actions/invoice.action';
import { switchMap, map, of, catchError } from 'rxjs';
import { InvoiceService } from '../../invoice.service';

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

  addInvoice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invoiceActions.addInvoice),
      switchMap(({ invoice }) =>
        this.invoiceService.addInvoice(invoice).pipe(
          map((newInvoice) =>
            invoiceActions.addInvoiceSuccess({ invoice: newInvoice })
          ),
          catchError((error) => of(invoiceActions.addInvoiceFailure({ error })))
        )
      )
    )
  );

  updateInvoice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invoiceActions.updateInvoice),
      switchMap(({ invoice }) =>
        this.invoiceService.updateInvoice(invoice).pipe(
          map((updatedInvoice) =>
            invoiceActions.updateInvoiceSuccess({ invoice: updatedInvoice })
          ),
          catchError((error) =>
            of(invoiceActions.updateInvoiceFailure({ error }))
          )
        )
      )
    )
  );

  deleteInvoice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invoiceActions.deleteInvoice),
      switchMap(({ invoiceId }) =>
        this.invoiceService.deleteInvoice(invoiceId).pipe(
          map(() => invoiceActions.deleteInvoiceSuccess({ invoiceId })),
          catchError((error) =>
            of(invoiceActions.deleteInvoiceFailure({ error }))
          )
        )
      )
    )
  );

  updateInvoiceStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invoiceActions.updateInvoiceStatus),
      switchMap(({ invoiceId, status }) =>
        this.invoiceService.updateInvoiceStatus(invoiceId, status).pipe(
          map(() =>
            invoiceActions.updateInvoiceStatusSuccess({ invoiceId, status })
          ),
          catchError((error) =>
            of(invoiceActions.updateInvoiceStatusFailure({ error }))
          )
        )
      )
    )
  );
}
