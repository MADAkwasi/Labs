import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Invoice, invoiceStatus } from '../../../assets/data/model';

export const invoiceActions = createActionGroup({
  source: 'Invoice Component',
  events: {
    loadInvoices: emptyProps(),
    loadInvoicesSuccess: props<{ invoices: Invoice[] }>(),
    loadInvoicesFailure: props<{ error: any }>(),

    addInvoice: props<{ invoice: Invoice }>(),
    addInvoiceSuccess: props<{ invoice: Invoice }>(),
    addInvoiceFailure: props<{ error: any }>(),

    updateInvoice: props<{ invoice: Invoice }>(),
    updateInvoiceSuccess: props<{ invoice: Invoice }>(),
    updateInvoiceFailure: props<{ error: any }>(),

    deleteInvoice: props<{ invoiceId: string }>(),
    deleteInvoiceSuccess: props<{ invoiceId: string }>(),
    deleteInvoiceFailure: props<{ error: any }>(),

    updateInvoiceStatus: props<{ invoiceId: string; status: invoiceStatus }>(),
    updateInvoiceStatusSuccess: props<{ invoiceId: string; status: invoiceStatus }>(),
    updateInvoiceStatusFailure: props<{ error: any }>(),
    

    setActiveInvoice: props<{ invoiceId: string }>(),
    editField: props<{ path: string[]; value: any }>(),
    updateFilters: props<{ statuses: string[] }>(),
  },
});
