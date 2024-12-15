import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { PlanState } from '../../state/reducers/plan.reducer';
import { selectSubscriptionRate } from '../../state/selectors/plan.selector';
import { updateSubscriptionRate } from '../../state/actions/plan.action';
import { rate } from '../plan-card/plan.model';

@Component({
  selector: 'app-subscription-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscription-toggle.component.html',
  styleUrls: ['./subscription-toggle.component.css'],
})

export class SubscriptionToggleComponent implements OnInit, OnDestroy {
  selectedRate: rate = 'monthly';
  private subscriptions: Subscription[] = [];
  private store: Store<PlanState>;

  constructor(store: Store<PlanState>) {
    this.store = store;
  }

  ngOnInit(): void {
    const subscriptionRateSub = this.store
      .select(selectSubscriptionRate)
      .subscribe((rate) => {
        if (rate) {
          this.selectedRate = rate;
        }
      });

    this.subscriptions.push(subscriptionRateSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  onToggle(): void {
    const newRate: rate = this.selectedRate === 'monthly' ? 'yearly' : 'monthly';
    this.store.dispatch(updateSubscriptionRate({ rate: newRate }));
  }
}
