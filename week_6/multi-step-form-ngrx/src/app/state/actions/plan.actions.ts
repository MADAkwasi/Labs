// actions/plan.actions.ts
import { createAction, props } from '@ngrx/store';

export const updateSubscriptionPlan = createAction(
  '[Plan] Update Subscription Plan',
  props<{ plan: string }>()
);

export const updateSubscriptionRate = createAction(
  '[Plan] Update Subscription Rate',
  props<{ rate: string }>()
);

export const updatePlanFormValidity = createAction(
  '[Plan] Update Plan Form Validity',
  props<{ isValid: boolean }>()
);
