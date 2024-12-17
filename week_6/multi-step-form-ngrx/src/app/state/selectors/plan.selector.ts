import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PlanState } from '../reducers/plan.reducer';

const getPlanState = createFeatureSelector<PlanState>('plan');

export const selectSelectedPlan = createSelector(
  getPlanState,
  (state: PlanState) => state.selectedPlan
);

export const selectSubscriptionRate = createSelector(
  getPlanState,
  (state: PlanState) => state.subscriptionRate
);

export const selectPlanIsValid = createSelector(
  getPlanState,
  (state: PlanState) => state.isValid
);
