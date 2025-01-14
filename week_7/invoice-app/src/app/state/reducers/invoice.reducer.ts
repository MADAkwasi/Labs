import { createReducer, on } from '@ngrx/store';
import { Invoice } from '../../../assets/data/model';
import { invoiceActions } from '../actions/invoice.action';

export interface InvoiceState {
  invoices: Invoice[];
  activeInvoice: Invoice | null;
  isLoading: boolean;
  filters: { statuses: string[] };
  error: string | null;
}

const initialInvoiceState: InvoiceState = {
  invoices: [
    {
      id: 'RT3080',
      createdAt: '2021-08-18',
      paymentDue: '2021-08-19',
      description: 'Re-branding',
      paymentTerms: 1,
      clientName: 'Jensen Huang',
      clientEmail: 'jensenh@mail.com',
      status: 'paid',
      senderAddress: {
        street: '19 Union Terrace',
        city: 'London',
        postCode: 'E1 3EZ',
        country: 'United Kingdom',
      },
      clientAddress: {
        street: '106 Kendell Street',
        city: 'Sharrington',
        postCode: 'NR24 5WQ',
        country: 'United Kingdom',
      },
      items: [
        {
          name: 'Brand Guidelines',
          quantity: 1,
          price: 1800.9,
          total: 1800.9,
        },
      ],
      total: 1800.9,
    },
    {
      id: 'XM9141',
      createdAt: '2021-08-21',
      paymentDue: '2021-09-20',
      description: 'Graphic Design',
      paymentTerms: 30,
      clientName: 'Alex Grim',
      clientEmail: 'alexgrim@mail.com',
      status: 'pending',
      senderAddress: {
        street: '19 Union Terrace',
        city: 'London',
        postCode: 'E1 3EZ',
        country: 'United Kingdom',
      },
      clientAddress: {
        street: '84 Church Way',
        city: 'Bradford',
        postCode: 'BD1 9PB',
        country: 'United Kingdom',
      },
      items: [
        {
          name: 'Banner Design',
          quantity: 1,
          price: 156.0,
          total: 156.0,
        },
        {
          name: 'Email Design',
          quantity: 2,
          price: 200.0,
          total: 400.0,
        },
      ],
      total: 556.0,
    },
    {
      id: 'RG0314',
      createdAt: '2021-09-24',
      paymentDue: '2021-10-01',
      description: 'Website Redesign',
      paymentTerms: 7,
      clientName: 'John Morrison',
      clientEmail: 'jm@myco.com',
      status: 'paid',
      senderAddress: {
        street: '19 Union Terrace',
        city: 'London',
        postCode: 'E1 3EZ',
        country: 'United Kingdom',
      },
      clientAddress: {
        street: '79 Dover Road',
        city: 'Westhall',
        postCode: 'IP19 3PF',
        country: 'United Kingdom',
      },
      items: [
        {
          name: 'Website Redesign',
          quantity: 1,
          price: 14002.33,
          total: 14002.33,
        },
      ],
      total: 14002.33,
    },
    {
      id: 'RT2080',
      createdAt: '2021-10-11',
      paymentDue: '2021-10-12',
      description: 'Logo Concept',
      paymentTerms: 1,
      clientName: 'Alysa Werner',
      clientEmail: 'alysa@email.co.uk',
      status: 'pending',
      senderAddress: {
        street: '19 Union Terrace',
        city: 'London',
        postCode: 'E1 3EZ',
        country: 'United Kingdom',
      },
      clientAddress: {
        street: '63 Warwick Road',
        city: 'Carlisle',
        postCode: 'CA20 2TG',
        country: 'United Kingdom',
      },
      items: [
        {
          name: 'Logo Sketches',
          quantity: 1,
          price: 102.04,
          total: 102.04,
        },
      ],
      total: 102.04,
    },
    {
      id: 'AA1449',
      createdAt: '2021-10-7',
      paymentDue: '2021-10-14',
      description: 'Re-branding',
      paymentTerms: 7,
      clientName: 'Mellisa Clarke',
      clientEmail: 'mellisa.clarke@example.com',
      status: 'pending',
      senderAddress: {
        street: '19 Union Terrace',
        city: 'London',
        postCode: 'E1 3EZ',
        country: 'United Kingdom',
      },
      clientAddress: {
        street: '46 Abbey Row',
        city: 'Cambridge',
        postCode: 'CB5 6EG',
        country: 'United Kingdom',
      },
      items: [
        {
          name: 'New Logo',
          quantity: 1,
          price: 1532.33,
          total: 1532.33,
        },
        {
          name: 'Brand Guidelines',
          quantity: 1,
          price: 2500.0,
          total: 2500.0,
        },
      ],
      total: 4032.33,
    },
    {
      id: 'TY9141',
      createdAt: '2021-10-01',
      paymentDue: '2021-10-31',
      description: 'Landing Page Design',
      paymentTerms: 30,
      clientName: 'Thomas Wayne',
      clientEmail: 'thomas@dc.com',
      status: 'pending',
      senderAddress: {
        street: '19 Union Terrace',
        city: 'London',
        postCode: 'E1 3EZ',
        country: 'United Kingdom',
      },
      clientAddress: {
        street: '3964  Queens Lane',
        city: 'Gotham',
        postCode: '60457',
        country: 'United States of America',
      },
      items: [
        {
          name: 'Web Design',
          quantity: 1,
          price: 6155.91,
          total: 6155.91,
        },
      ],
      total: 6155.91,
    },
    {
      id: 'FV2353',
      createdAt: '2021-11-05',
      paymentDue: '2021-11-12',
      description: 'Logo Re-design',
      paymentTerms: 7,
      clientName: 'Anita Wainwright',
      clientEmail: '',
      status: 'draft',
      senderAddress: {
        street: '19 Union Terrace',
        city: 'London',
        postCode: 'E1 3EZ',
        country: 'United Kingdom',
      },
      clientAddress: {
        street: '',
        city: '',
        postCode: '',
        country: '',
      },
      items: [
        {
          name: 'Logo Re-design',
          quantity: 1,
          price: 3102.04,
          total: 3102.04,
        },
      ],
      total: 3102.04,
    },
  ],
  activeInvoice: null,
  isLoading: false,
  filters: {
    statuses: [],
  },
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
  setActiveInvoice,
  editField,
  updateFilters,
} = invoiceActions;

export const invoiceReducer = createReducer(
  initialInvoiceState,

  on(loadInvoices, (state) => ({
    ...state,
    isLoading: state.invoices.length === 0,
    error: null,
  })),

  on(loadInvoicesSuccess, (state, { invoices }) => ({
    ...state,
    isLoading: false,
    invoices: [
      ...state.invoices.filter((inv) =>
        invoices.every((newInv) => newInv.id !== inv.id)
      ),
      ...invoices,
    ],
  })),

  on(loadInvoicesFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(setActiveInvoice, (state, { invoiceId }) => ({
    ...state,
    activeInvoice: state.invoices.find(
      (inv) => inv.id === invoiceId
    ) as Invoice,
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
    activeInvoice: invoice,
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
  })),

  on(editField, (state, { path, value }) => {
    if (!state.activeInvoice) return state;

    const updateNestedField = (obj: any, path: string[], value: any): any => {
      if (path.length === 1) {
        return { ...obj, [path[0]]: value };
      }
      const [key, ...rest] = path;
      return {
        ...obj,
        [key]: updateNestedField(obj[key], rest, value),
      };
    };

    const updatedActiveInvoice = updateNestedField(
      state.activeInvoice,
      path,
      value
    );

    return {
      ...state,
      activeInvoice: updatedActiveInvoice,
      invoices: state.invoices.map((inv) =>
        inv.id === updatedActiveInvoice.id ? updatedActiveInvoice : inv
      ),
    };
  }),

  on(updateFilters, (state, { statuses }) => ({
    ...state,
    filters: { ...state.filters, statuses },
  }))
);
