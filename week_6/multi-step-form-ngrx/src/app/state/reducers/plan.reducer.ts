import { createReducer, on } from '@ngrx/store';
import { updateSubscriptionPlan, updateSubscriptionRate } from '../actions/plan.action';
import { rate, selectedPackage } from '../../components/plan-card/plan.model';

export interface PlanState {
  selectedPlan: selectedPackage;
  subscriptionRate: rate;
  isValid: boolean;
}

export const initialState: PlanState = {
  selectedPlan: { name: '', price: '' },
  subscriptionRate: 'monthly',
  isValid: false
};

export const planReducer = createReducer(
  initialState,
  on(updateSubscriptionPlan, (state, { plan }) => ({
    ...state,
    selectedPlan: plan,
  })),
  on(updateSubscriptionRate, (state, { rate }) => ({
    ...state,
    subscriptionRate: rate,
  }))
);
