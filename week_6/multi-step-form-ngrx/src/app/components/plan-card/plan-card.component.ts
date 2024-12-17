import { Component, OnInit } from '@angular/core';
import { Plan, rate, selectedPackage } from './plan.model';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { PlanState } from '../../state/reducers/plan.reducer';
import {
  selectSelectedPlan,
  selectSubscriptionRate,
} from '../../state/selectors/plan.selector';
import { updateSubscriptionPlan } from '../../state/actions/plan.action';

@Component({
  selector: 'app-plan-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plan-card.component.html',
  styleUrls: ['./plan-card.component.css'],
})
export class PlanCardComponent implements OnInit {
  plans: Plan[] = [
    {
      icon: 'assets/images/icon-arcade.svg',
      name: 'arcade',
      price: { monthly: '$9/mo', yearly: '$90/yr' },
    },
    {
      icon: 'assets/images/icon-advanced.svg',
      name: 'advanced',
      price: { monthly: '$12/mo', yearly: '$120/yr' },
    },
    {
      icon: 'assets/images/icon-pro.svg',
      name: 'pro',
      price: { monthly: '$15/mo', yearly: '$150/yr' },
    },
  ];

  selectedPlan: selectedPackage = { name: '', price: '' };
  subscriptionRate: rate = 'monthly';

  constructor(private store: Store<PlanState>) {}

  ngOnInit(): void {
    this.store.select(selectSubscriptionRate).subscribe((rate: rate) => {
      this.subscriptionRate = rate ?? 'monthly';
    });

    this.store.select(selectSelectedPlan).subscribe((plan: selectedPackage) => {
      if (plan) {
        this.selectedPlan = plan;
      }
    });
  }

  onSelect(plan: Plan): void {
    const selectedPlan: selectedPackage = {
      name: plan.name,
      price: plan.price[this.subscriptionRate],
    };

    this.store.dispatch(updateSubscriptionPlan({ plan: selectedPlan }));
  }
}
