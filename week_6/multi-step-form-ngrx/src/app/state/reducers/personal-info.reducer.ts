import { createReducer, on } from '@ngrx/store';
import { updatePersonalInfo, updatePersonalInfoValidity } from '../actions/personal-info.action';

export interface PersonalInfoState {
  name: string;
  email: string;
  number: string;
  isValid: boolean;
}

export const initialState: PersonalInfoState = {
  name: '',
  email: '',
  number: '',
  isValid: false,
};

export const personalInfoReducer = createReducer(
  initialState,
  on(updatePersonalInfo, (state, { personalInfo }) => ({
    ...state,
    ...personalInfo,
  })),
  on(updatePersonalInfoValidity, (state, { isValid }) => ({
    ...state,
    isValid,
  }))
);
