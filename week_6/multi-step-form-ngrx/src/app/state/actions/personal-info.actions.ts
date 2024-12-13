import {createAction, props} from '@ngrx/store';

export const name = createAction('[Text Fields] Name', props<{name: string}>());
export const email = createAction('[Text Fields] Email', props<{email: string}>());
export const number = createAction('[Text Fields] Number', props<{number: string}>());
