import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { personalInfoReducer, PersonalInfoState } from './personal-info.reducer';
import { addOnsReducer, AddOnsState } from './add-ons.reducer';
import { planReducer, PlanState } from './plan.reducer';  // Import the plan reducer

export interface AppState {
  personalInfo: PersonalInfoState;
  addOns: AddOnsState;
  plan: PlanState;  // Include the plan state
}

export interface RootState {
  personalInfo: PersonalInfoState;
  plan: PlanState;
}

export const reducers: ActionReducerMap<AppState> = {
  personalInfo: personalInfoReducer,
  addOns: addOnsReducer,
  plan: planReducer,  // Add plan reducer
};

// Update metaReducers to include plan state in localStorage sync
export function localStorageSyncReducer(reducer: any): any {
  return localStorageSync({
    keys: ['personalInfo', 'addOns', 'plan'],  // Persist personalInfo, addOns, and plan
    rehydrate: true,
  })(reducer);
}

export const metaReducers: MetaReducer<AppState>[] = [localStorageSyncReducer];
