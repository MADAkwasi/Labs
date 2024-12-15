import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { personalInfoReducer, PersonalInfoState } from './personal-info.reducer';

export interface AppState {
  personalInfo: PersonalInfoState;
}

export const reducers: ActionReducerMap<AppState> = {
  personalInfo: personalInfoReducer,
};

export function localStorageSyncReducer(reducer: any): any {
  return localStorageSync({
    keys: ['personalInfo'],
    rehydrate: true,
  })(reducer);
}

export const metaReducers: MetaReducer<AppState>[] = [localStorageSyncReducer];
