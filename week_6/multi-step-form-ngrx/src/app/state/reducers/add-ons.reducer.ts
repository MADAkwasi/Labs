import { createReducer, on } from '@ngrx/store';
import { updateSelectedAddOns } from '../actions/add-ons.action';
import { selectedPackage } from '../../components/plan-card/plan.model';

export interface AddOnsState {
  selectedAddOns: selectedPackage[];
}

export const initialState: AddOnsState = {
  selectedAddOns: [],
};

export const addOnsReducer = createReducer(
  initialState,
  on(updateSelectedAddOns, (state, { selectedAddOns }) => {
    return { ...state, selectedAddOns };
  })
);
