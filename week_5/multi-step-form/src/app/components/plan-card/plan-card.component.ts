import { Component } from '@angular/core';
import { Plan, rate } from './plan.model';

@Component({
  selector: 'app-plan-card',
  standalone: true,
  imports: [],
  templateUrl: './plan-card.component.html',
  styleUrl: './plan-card.component.css',
})
export class PlanCardComponent {
  plans: Plan[] = [
    {
      icon: '/images/icon-arcade.svg',
      name: 'arcade',
      price: { monthly: '$9/mo', yearly: '$90/yr' },
    },
    {
      icon: '/images/icon-advanced.svg',
      name: 'advanced',
      price: { monthly: '$12/mo', yearly: '$120/yr' },
    },
    {
      icon: '/images/icon-pro.svg',
      name: 'pro',
      price: { monthly: '$15/mo', yearly: '$150/yr' },
    },
  ];

  subscriptionPlan: rate = 'monthly';
}
