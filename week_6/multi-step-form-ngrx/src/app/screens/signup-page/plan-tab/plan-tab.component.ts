import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { rate } from '../../../components/plan-card/plan.model';
import {
  updateSubscriptionRate,
  updatePlanFormValidity,
} from '../../../state/actions/plan.action';
import {
  selectPlanIsValid,
  selectSubscriptionRate,
} from '../../../state/selectors/plan.selector';
import { selectPersonalInfoValid } from '../../../state/selectors/personal-info.selector';
import { ButtonComponent } from '../../../components/button/button.component';
import { PlanCardComponent } from '../../../components/plan-card/plan-card.component';
import { AsyncPipe } from '@angular/common';
import { SubscriptionToggleComponent } from '../../../components/subscription-toggle/subscription-toggle.component';

@Component({
  selector: 'app-plan-tab',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    PlanCardComponent,
    AsyncPipe,
    SubscriptionToggleComponent,
  ],
  templateUrl: './plan-tab.component.html',
  styleUrls: ['./plan-tab.component.css'],
})
export class PlanTabComponent implements OnInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);
  private readonly subscriptions: Subscription[] = [];
  myForm!: FormGroup;
  subscriptionRate$: Observable<rate>;
  isFormValid$!: Observable<boolean>;

  constructor() {
    this.subscriptionRate$ = this.store.select(selectSubscriptionRate);
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      subscriptionRate: ['monthly', Validators.required],
    });

    this.isFormValid$ = combineLatest([
      this.store.select(selectPersonalInfoValid),
      this.store.select(selectPlanIsValid),
    ]).pipe(
      map(([personalInfoValid, planValid]) => personalInfoValid && planValid)
    );

    const subscriptionRateSubscription = this.subscriptionRate$.subscribe(
      (rate) => {
        if (rate) {
          this.myForm.get('subscriptionRate')?.setValue(rate);
        }
      }
    );

    this.myForm.valueChanges.subscribe((value) => {
      const isValid = this.myForm.valid;
      this.store.dispatch(
        updateSubscriptionRate({ rate: value.subscriptionRate })
      );
      this.store.dispatch(updatePlanFormValidity({ isValid }));
    });

    this.subscriptions.push(subscriptionRateSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  onRateChange(rate: rate): void {
    this.myForm.get('subscriptionRate')?.setValue(rate);
    this.store.dispatch(updateSubscriptionRate({ rate }));
  }
}
