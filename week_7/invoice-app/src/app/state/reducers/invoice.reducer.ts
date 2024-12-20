import { createReducer, on } from '@ngrx/store';
import { Invoice } from '../../data/model';
import { invoiceActions } from '../actions/invoice.action';

export interface InvoiceState {
  invoices: Invoice[];
  isLoading: boolean;
  error: string | null;
}

const initialInvoiceState: InvoiceState = {
  invoices: [],
  isLoading: false,
  error: null,
};

const {
  loadInvoices,
  loadInvoicesSuccess,
  loadInvoicesFailure,
  deleteInvoice,
  updateInvoice,
  updateInvoiceStatus,
  addInvoice,
} = invoiceActions;

export const invoiceReducer = createReducer(
  initialInvoiceState,

  on(loadInvoices, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(loadInvoicesSuccess, (state, { invoices }) => ({
    ...state,
    invoices,
    isLoading: false,
  })),

  on(loadInvoicesFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(addInvoice, (state, { invoice }) => ({
    ...state,
    invoices: [...state.invoices, invoice],
  })),

  on(updateInvoice, (state, { invoice }) => ({
    ...state,
    invoices: state.invoices.map((inv) =>
      inv.id === invoice.id ? { ...inv, ...invoice } : inv
    ),
  })),

  on(deleteInvoice, (state, { invoiceId }) => ({
    ...state,
    invoices: state.invoices.filter((inv) => inv.id !== invoiceId),
  })),

  on(updateInvoiceStatus, (state, { invoiceId, status }) => ({
    ...state,
    invoices: state.invoices.map((inv) =>
      inv.id === invoiceId ? { ...inv, status } : inv
    ),
  }))
);
