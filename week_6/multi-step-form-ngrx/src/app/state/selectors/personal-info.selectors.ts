import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PersonalInfoState } from '../reducers/personal-info.reducer';

export const selectPersonalInfoFeature = createFeatureSelector<PersonalInfoState>('personalInfo');

export const selectPersonalInfo = createSelector(
  selectPersonalInfoFeature,
  (state) => state.personalInfo
);
