import { createSelector } from '@ngrx/store';
import { PersonalInfoState } from '../reducers/personal-info.reducer';

export const selectPersonalInfo = (state: { personalInfo: PersonalInfoState }) => state.personalInfo;

export const selectPersonalInfoIsValid = createSelector(
  selectPersonalInfo,
  (personalInfo) => personalInfo.isValid
);
