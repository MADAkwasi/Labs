import { createAction, props } from '@ngrx/store';
import {PersonalInfoState} from '../reducers/personal-info.reducer';

export const updatePersonalInfo = createAction(
  '[Personal Info] Update Personal Info',
  props<{ personalInfo: PersonalInfoState }>()
);
