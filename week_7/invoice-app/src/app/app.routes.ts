import { Routes } from '@angular/router';
import { InvoicesComponent } from './screens/invoices/invoices.component';
import { InvoiceComponent } from './screens/invoice/invoice.component';
import { PageNotFoundComponent } from './screens/page-not-found/page-not-found.component';
import { LoginComponent } from './screens/login/login.component';
import { UnauthorizedComponent } from './screens/unauthorized/unauthorized.component';
import { AuthGuard } from './auth/auth-guard';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: InvoicesComponent,
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'invoice/:id',
    component: InvoiceComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
