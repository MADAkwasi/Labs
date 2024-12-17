import { createAction, props } from '@ngrx/store';
import { selectedPackage } from '../../components/plan-card/plan.model';

export const updateSelectedAddOns = createAction(
  '[AddOns] Update Selected AddOns',
  props<{ selectedAddOns: selectedPackage[] }>()
);
