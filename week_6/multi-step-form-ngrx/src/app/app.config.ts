import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import {personalInfoReducer} from './state/reducers/personal-info.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { metaReducers, reducers } from './state/reducers/reducers';
import { planReducer } from './state/reducers/plan.reducer';
import { addOnsReducer } from './state/reducers/add-ons.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions()),
    provideStore(reducers, { metaReducers }),
    provideState({name: 'personalInfo', reducer: personalInfoReducer }),
    provideState({ name: 'plan', reducer: planReducer }),
    provideState({name: 'addOns', reducer: addOnsReducer }),
    provideStoreDevtools(({
       maxAge:25,
      logOnly:!isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
      connectInZone: true
    }))
  ],
};
