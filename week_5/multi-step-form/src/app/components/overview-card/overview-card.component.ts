import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SubscriptionOverview } from './overview-card.model';

@Component({
  selector: 'app-overview-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './overview-card.component.html',
  styleUrl: './overview-card.component.css',
})
export class OverviewCardComponent implements OnInit {
  overview: SubscriptionOverview = {
    plan: { name: 'Arcade', rate: 'monthly', price: '$9/mo' },
    addOns: [
      { name: 'Online Service', price: '$1/mo' },
      { name: 'Larger Storage', price: '$2/mo' },
    ],
  };

  totalPrice!: number;

  ngOnInit(): void {
    const addOnsPrice = this.overview.addOns.reduce((acc, cur) => {
      const price = parseInt(cur.price.match(/\d+/)?.[0] || '0', 10);
      return acc + price;
    }, 0);

    const planPrice = parseInt(
      this.overview.plan.price.match(/\d+/)?.[0] || '0',
      10
    );

    this.totalPrice = addOnsPrice + planPrice;
  }
}
