import { createReducer, on } from '@ngrx/store';
import { interactionsActions } from '../actions/interactions.action';

export interface InteractionsState {
  wantsToDelete: boolean;
}

const initialState: InteractionsState = {
  wantsToDelete: false,
};

export const interactionsReducer = createReducer(
  initialState,

  on(interactionsActions.handleDelete, (state) => ({
    ...state,
    wantsToDelete: true,
  })),

  on(interactionsActions.cancelDelete, (state) => ({
    ...state,
    wantsToDelete: false,
  }))
);
