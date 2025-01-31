import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { invoiceReducer } from './state/reducers/invoice.reducer';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { InvoiceEffect } from './state/effects/invoice.effect';
import { interactionsReducer } from './state/reducers/interactions.reducer';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { AuthGuard } from './auth/auth-guard';
import { AuthService } from './auth/auth.service';
import { authInterceptor } from './auth/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(),
    provideState({ name: 'invoices', reducer: invoiceReducer }),
    provideState({ name: 'interactions', reducer: interactionsReducer }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects([InvoiceEffect]),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-top-center',
      progressBar: true,
    }),
    AuthGuard,
    AuthService,
  ],
};
