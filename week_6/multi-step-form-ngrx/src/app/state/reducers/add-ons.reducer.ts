import { createReducer, on } from '@ngrx/store';
import { updateSelectedAddOns } from '../actions/add-ons.action';
import { selectedPackage } from '../../components/plan-card/plan.model';

// Define the state for add-ons
export interface AddOnsState {
  selectedAddOns: selectedPackage[];
}

export const initialState: AddOnsState = {
  selectedAddOns: [],  // Initialize with an empty array or load from localStorage
};

export const addOnsReducer = createReducer(
  initialState,
  on(updateSelectedAddOns, (state, { selectedAddOns }) => {
    return { ...state, selectedAddOns };  // Update the state with the new selected add-ons
  })
);
