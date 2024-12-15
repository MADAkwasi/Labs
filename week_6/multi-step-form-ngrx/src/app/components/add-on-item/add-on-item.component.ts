import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormArray, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AddOnItem, rate } from './add-on-item.model';
import { CommonModule } from '@angular/common';
import { selectSelectedAddOns } from '../../state/selectors/add-ons.selector';
import { updateSelectedAddOns } from '../../state/actions/add-ons.action';
import { selectedPackage } from '../plan-card/plan.model';
import { selectSubscriptionRate } from '../../state/selectors/plan.selector';

@Component({
  selector: 'app-add-on-item',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-on-item.component.html',
  styleUrls: ['./add-on-item.component.css'],
})
export class AddOnItemComponent implements OnInit {
  // Static list of add-ons (no isChecked state here)
  items: AddOnItem[] = [
    { name: 'Online Service', description: 'Access to multiplayer games', price: { monthly: '$1/mo', yearly: '$10/yr' } },
    { name: 'Larger Storage', description: 'Extra 1TB of cloud save', price: { monthly: '$2/mo', yearly: '$20/yr' } },
    { name: 'Customizable Profile', description: 'Custom theme on your profile', price: { monthly: '$2/mo', yearly: '$20/yr' } },
  ];

  // Observable for selected add-ons and subscription rate
  selectedAddOns$: Observable<selectedPackage[]>;
  subscriptionRate$: Observable<rate>;
  subscriptionRate: rate = 'monthly'; // Default fallback

  // Local state to track the checked state of each add-on
  isChecked: boolean[] = [];

  constructor(private store: Store, private fb: FormBuilder) {
    // Select selected add-ons and subscription rate from the store
    this.selectedAddOns$ = this.store.select(selectSelectedAddOns);
    this.subscriptionRate$ = this.store.select(selectSubscriptionRate);
  }

  ngOnInit(): void {
    // Subscribe to selected add-ons and update isChecked array
    this.selectedAddOns$.subscribe((selectedAddOns) => {
      this.isChecked = this.items.map((item) => {
        const isStored = selectedAddOns.some((addOn) => addOn.name === item.name);
        return isStored;
      });
    });

    // Subscribe to the subscriptionRate observable and handle fallback
    this.subscriptionRate$.subscribe((rate) => {
      if (rate) {
        this.subscriptionRate = rate;
      }
    });
  }

  toggleSelection(index: number): void {
    // Toggle the checked state of the add-on at the given index
    this.isChecked[index] = !this.isChecked[index];

    // Update the store with the new selected add-ons
    const updatedSelectedAddOns = this.items
      .filter((_, i) => this.isChecked[i]) // Get the checked items
      .map((item) => ({
        name: item.name,
        price: item.price[this.subscriptionRate], // Use the subscription rate to determine the price
      }));

    // Dispatch the updated add-ons to the store
    this.store.dispatch(updateSelectedAddOns({ selectedAddOns: updatedSelectedAddOns }));
  }
}
