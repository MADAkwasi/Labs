import { createReducer, on } from '@ngrx/store';
import { updatePersonalInfo } from '../actions/personal-info.actions';

export interface PersonalInfoState {
  name: string;
  email: string;
  number: string;
}

export const initialState: PersonalInfoState = {
  name: '',
  email: '',
  number: '',
};

export const personalInfoReducer = createReducer(
  initialState,
  on(updatePersonalInfo, (state, { personalInfo }) => ({
    ...state,
    ...personalInfo,
  }))
);
