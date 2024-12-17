import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StorageService } from '../../storage.service';
import { Package, rate } from './overview-card.model';

@Component({
  selector: 'app-overview-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './overview-card.component.html',
  styleUrl: './overview-card.component.css',
})
export class OverviewCardComponent implements OnInit {
  plan!: Package;
  addOns: Package[] = [];
  subscriptionRate!: rate;

  totalPrice!: number;

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    const storedPlan = this.storageService.getData<Package>('subscriptionPlan');
    const storedAddOns = this.storageService.getData<Package[]>('addOns');
    this.subscriptionRate =
      this.storageService.getData<rate>('subscriptionRate') || 'monthly';

    if (storedPlan) this.plan = storedPlan;
    if (storedAddOns) this.addOns = storedAddOns;

    if (this.plan && this.addOns) {
      const addOnsPrice = (this.addOns || []).reduce((acc, cur) => {
        const price = parseInt(cur.price.match(/\d+/)?.[0] || '0', 10);
        return acc + price;
      }, 0);

      const planPrice = parseInt(this.plan.price.match(/\d+/)?.[0] || '0', 10);

      this.totalPrice = addOnsPrice + planPrice;
    }
  }
}
