import { createAction, props } from '@ngrx/store';
import { AddOnItem } from '../../components/add-on-item/add-on-item.model';

// Action to update selected add-ons
export const updateSelectedAddOns = createAction(
  '[Add-Ons] Update Selected Add-Ons',
  props<{ addOns: AddOnItem[] }>()
);

