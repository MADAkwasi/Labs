import { createAction, props } from '@ngrx/store';
import { rate, selectedPackage } from '../../components/plan-card/plan.model';

export const updateSubscriptionPlan = createAction(
  '[Plan] Update Subscription Plan',
  props<{ plan: selectedPackage }>()
);

export const updateSubscriptionRate = createAction(
  '[Plan] Update Subscription Rate',
  props<{ rate: rate }>()
);

export const updatePlanFormValidity = createAction(
  '[Plan] Update Plan Form Validity',
  props<{ isValid: boolean }>()
);
