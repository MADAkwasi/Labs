import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { selectSelectedPlan, selectSubscriptionRate } from '../../state/selectors/plan.selector';
import { selectSelectedAddOns } from '../../state/selectors/add-ons.selector';
import { Package, rate } from './overview-card.model';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-overview-card',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: './overview-card.component.html',
  styleUrl: './overview-card.component.css',
})
export class OverviewCardComponent implements OnInit {
  plan$!: Observable<Package | null>;
  subscriptionRate$!: Observable<rate>;
  addOns$!: Observable<Package[]>;
  totalPrice!: number;

  constructor(private store: Store) {}

  ngOnInit(): void {
    // Access plan and subscription rate from the store
    this.plan$ = this.store.select(selectSelectedPlan);
    this.subscriptionRate$ = this.store.select(selectSubscriptionRate);

    // Use the store to fetch add-ons as an observable
    this.addOns$ = this.store.select(selectSelectedAddOns);

    this.calculateTotalPrice()
  }

  calculateTotalPrice(): void {
    // Calculate the total price based on the add-ons and plan
    this.addOns$.subscribe((addOns) => {
      let addOnsPrice = addOns.reduce((acc, cur) => {
        const price = parseInt(cur.price.match(/\d+/)?.[0] || '0', 10);
        return acc + price;
      }, 0);

      this.plan$.subscribe((plan) => {
        if (plan) {
          const planPrice = parseInt(plan.price.match(/\d+/)?.[0] || '0', 10);
          this.totalPrice = addOnsPrice + planPrice;
        }
      });
    });
  }
}
