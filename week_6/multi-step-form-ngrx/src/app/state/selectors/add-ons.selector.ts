import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectedPackage } from '../../components/plan-card/plan.model';
import { rate } from '../../components/add-on-item/add-on-item.model';

interface AddOnState {
  selectedAddOns: selectedPackage[];
  subscriptionRate: rate;
}

const selectAddOnState = createFeatureSelector<AddOnState>('addOns');

export const selectSelectedAddOns = createSelector(
  selectAddOnState,
  (state: AddOnState) => state.selectedAddOns
);

export const selectSubscriptionRate = createSelector(
  selectAddOnState,
  (state: AddOnState) => state.subscriptionRate
);
