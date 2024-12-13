import {Action, createReducer, on} from '@ngrx/store';
import {name} from '../actions/personal-info.actions';

interface PersonalInfoState {
  name: string;
  email: string;
  number: string;
}

export const initialState:PersonalInfoState={name: '', email: '', number: ''};

export const personalInfoReducer = createReducer(
  initialState,
  on(name, (state: PersonalInfoState, { name }: { name: string } & Action<"[Text Fields] Name"> ):PersonalInfoState => ({ ...state, name }))
)
