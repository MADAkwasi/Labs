import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlanState } from '../../../state/reducers/plan.reducer';
import { rate } from '../../../components/plan-card/plan.model';
import { updateSubscriptionRate, updatePlanFormValidity } from '../../../state/actions/plan.action';
import { selectPlanIsValid, selectSubscriptionRate } from '../../../state/selectors/plan.selector';
import { selectPersonalInfoValid } from '../../../state/selectors/personal-info.selector';
import { HeadingComponent } from '../../../components/heading/heading.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { PlanCardComponent } from '../../../components/plan-card/plan-card.component';
import { AsyncPipe } from '@angular/common';
import { SubscriptionToggleComponent } from '../../../components/subscription-toggle/subscription-toggle.component';
import { RootState } from '../../../state/reducers/reducers';

@Component({
  selector: 'app-plan-tab',
  standalone: true,
  imports: [ReactiveFormsModule, HeadingComponent, ButtonComponent, PlanCardComponent, AsyncPipe, SubscriptionToggleComponent],
  templateUrl: './plan-tab.component.html',
  styleUrls: ['./plan-tab.component.css'],
})
export class PlanTabComponent implements OnInit, OnDestroy {
  myForm!: FormGroup;
  subscriptionRate$: Observable<rate>;
  isFormValid$!: Observable<boolean>;
  private subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder, private store: Store<RootState>) {
    this.subscriptionRate$ = this.store.select(selectSubscriptionRate);
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      subscriptionRate: ['monthly', Validators.required],
    });

    const personalInfoIsValid$ = this.store.select(selectPersonalInfoValid);

    this.isFormValid$ = combineLatest([
      this.store.select(selectPersonalInfoValid),
      this.store.select(selectPlanIsValid),
    ]).pipe(
      map(([personalInfoValid, planValid]) => personalInfoValid && planValid)
    );

    const subscriptionRateSubscription = this.subscriptionRate$.subscribe((rate) => {
      if (rate) {
        this.myForm.get('subscriptionRate')?.setValue(rate);
      }
    });

    this.myForm.valueChanges.subscribe((value) => {
      const isValid = this.myForm.valid;
      this.store.dispatch(updateSubscriptionRate({ rate: value.subscriptionRate }));
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

  onSubmit(){

  }
}
