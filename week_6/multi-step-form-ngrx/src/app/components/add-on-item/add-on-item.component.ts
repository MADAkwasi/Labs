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
  items: AddOnItem[] = [
    {
      name: 'Online Service',
      description: 'Access to multiplayer games',
      price: { monthly: '$1/mo', yearly: '$10/yr' },
    },
    {
      name: 'Larger Storage',
      description: 'Extra 1TB of cloud save',
      price: { monthly: '$2/mo', yearly: '$20/yr' },
    },
    {
      name: 'Customizable Profile',
      description: 'Custom theme on your profile',
      price: { monthly: '$2/mo', yearly: '$20/yr' },
    },
  ];

  selectedAddOns$: Observable<selectedPackage[]>;
  subscriptionRate$: Observable<rate>;
  subscriptionRate: rate = 'monthly';

  isChecked: boolean[] = [];

  constructor(private store: Store, private fb: FormBuilder) {
    this.selectedAddOns$ = this.store.select(selectSelectedAddOns);
    this.subscriptionRate$ = this.store.select(selectSubscriptionRate);
  }

  ngOnInit(): void {
    this.selectedAddOns$.subscribe((selectedAddOns) => {
      this.isChecked = this.items.map((item) => {
        const isStored = selectedAddOns.some(
          (addOn) => addOn.name === item.name
        );
        return isStored;
      });
    });

    this.subscriptionRate$.subscribe((rate) => {
      if (rate) {
        this.subscriptionRate = rate;
      }
    });
  }

  toggleSelection(index: number): void {
    this.isChecked[index] = !this.isChecked[index];

    const updatedSelectedAddOns = this.items
      .filter((_, i) => this.isChecked[i])
      .map((item) => ({
        name: item.name,
        price: item.price[this.subscriptionRate],
      }));

    this.store.dispatch(
      updateSelectedAddOns({ selectedAddOns: updatedSelectedAddOns })
    );
  }
}
