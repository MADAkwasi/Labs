import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { personalInfoReducer, PersonalInfoState } from './personal-info.reducer';
import { addOnsReducer, AddOnsState } from './add-ons.reducer';  // Import the add-ons reducer

export interface AppState {
  personalInfo: PersonalInfoState;
  addOns: AddOnsState;  // Add addOns state to the AppState
}

export const reducers: ActionReducerMap<AppState> = {
  personalInfo: personalInfoReducer,
  addOns: addOnsReducer,  // Add the addOns reducer to the root reducer
};

// Update the metaReducers to include localStorageSync for the addOns state
export function localStorageSyncReducer(reducer: any): any {
  return localStorageSync({
    keys: ['personalInfo', 'addOns'],  // Persist both personalInfo and addOns
    rehydrate: true,
  })(reducer);
}

export const metaReducers: MetaReducer<AppState>[] = [localStorageSyncReducer];
