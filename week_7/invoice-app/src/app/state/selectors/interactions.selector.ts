import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InteractionsState } from '../reducers/interactions.reducer';

export const selectInteractionState =
  createFeatureSelector<InteractionsState>('interactions');

export const selectDeleteState = createSelector(
  selectInteractionState,
  (state: InteractionsState) => state.wantsToDelete
);

export const selectFormState = createSelector(
  selectInteractionState,
  (state: InteractionsState) => state.isFormActive
);
