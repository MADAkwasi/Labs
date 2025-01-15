import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InvoiceState } from '../reducers/invoice.reducer';

export const selectInvoiceState =
  createFeatureSelector<InvoiceState>('invoices');

export const selectAllInvoices = createSelector(
  selectInvoiceState,
  (state: InvoiceState) => state.invoices
);

export const selectLoadingState = createSelector(
  selectInvoiceState,
  (state: InvoiceState) => state.isLoading
);

export const selectError = createSelector(
  selectInvoiceState,
  (state: InvoiceState) => state.error
);

export const selectActiveInvoice = createSelector(
  selectInvoiceState,
  (state: InvoiceState) => state.activeInvoice
);

export const selectFilterState = createSelector(
  (state: InvoiceState) => state.filters,
  (filters) => filters
);

export const selectFilteredInvoices = createSelector(
  selectInvoiceState,
  (state) =>
    state.filters.statuses.length
      ? state.invoices.filter((invoice) =>
          state.filters.statuses.includes(invoice.status)
        )
      : state.invoices
);
