import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import {
  personalInfoReducer,
  PersonalInfoState,
} from './personal-info.reducer';
import { addOnsReducer, AddOnsState } from './add-ons.reducer';
import { planReducer, PlanState } from './plan.reducer';

export interface AppState {
  personalInfo: PersonalInfoState;
  addOns: AddOnsState;
  plan: PlanState;
}

export interface RootState {
  personalInfo: PersonalInfoState;
  plan: PlanState;
}

export const reducers: ActionReducerMap<AppState> = {
  personalInfo: personalInfoReducer,
  addOns: addOnsReducer,
  plan: planReducer,
};

export function localStorageSyncReducer(reducer: any): any {
  return localStorageSync({
    keys: ['personalInfo', 'addOns', 'plan'],
    rehydrate: true,
  })(reducer);
}

export const metaReducers: MetaReducer<AppState>[] = [localStorageSyncReducer];
