import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectedPackage } from '../../components/plan-card/plan.model';
import { rate } from '../../components/add-on-item/add-on-item.model';

interface AddOnState {
  selectedAddOns: selectedPackage[];
  subscriptionRate: rate;
}

// Select the feature state
const selectAddOnState = createFeatureSelector<AddOnState>('addOns');

// Select selected add-ons
export const selectSelectedAddOns = createSelector(
  selectAddOnState,
  (state: AddOnState) => state.selectedAddOns
);

// Select subscription rate
export const selectSubscriptionRate = createSelector(
  selectAddOnState,
  (state: AddOnState) => state.subscriptionRate
);
