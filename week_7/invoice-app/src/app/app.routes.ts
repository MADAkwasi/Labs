import { Routes } from '@angular/router';
import { InvoicesComponent } from './screens/invoices/invoices.component';
import { InvoiceComponent } from './screens/invoice/invoice.component';
import { PageNotFoundComponent } from './screens/page-not-found/page-not-found.component';
import { LoginComponent } from './screens/login/login.component';
import { UnauthorizedComponent } from './screens/unauthorized/unauthorized.component';
import { AuthGuard } from './auth/auth-guard';
import { LayoutComponent } from './components/layout/layout.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: InvoicesComponent,
      },
      {
        path: 'invoice/:id',
        component: InvoiceComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
