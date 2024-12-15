import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { PlanState } from '../../../state/reducers/plan.reducer';
import { rate } from '../../../components/plan-card/plan.model';
import { updateSubscriptionRate } from '../../../state/actions/plan.action';
import { selectSubscriptionRate } from '../../../state/selectors/plan.selector';
import { NavigationStart, Router } from '@angular/router';
import { SubscriptionToggleComponent } from '../../../components/subscription-toggle/subscription-toggle.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { PlanCardComponent } from '../../../components/plan-card/plan-card.component';
import { HeadingComponent } from '../../../components/heading/heading.component';

@Component({
  selector: 'app-plan-tab',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SubscriptionToggleComponent,
    ButtonComponent,
    PlanCardComponent,
    HeadingComponent
  ],
  templateUrl: './plan-tab.component.html',
  styleUrls: ['./plan-tab.component.css'],
})
export class PlanTabComponent implements OnInit, OnDestroy {
  heading = 'Select your plan';
  details = 'You have the option of monthly or yearly billing.';
  myForm!: FormGroup;
  subscriptionRate$: Observable<rate>;
  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<PlanState>
  ) {
    this.subscriptionRate$ = this.store.select(selectSubscriptionRate);
  }

  ngOnInit(): void {
    // Initialize form group with default value
    this.myForm = this.fb.group({
      subscriptionRate: ['monthly', Validators.required],
    });

    // Set form value based on store subscriptionRate$
    const subscriptionRateSubscription = this.subscriptionRate$.subscribe((rate) => {
      if (rate) {
        this.myForm.get('subscriptionRate')?.setValue(rate);
      }
    });

    this.subscriptions.push(subscriptionRateSubscription);

    // Dispatch the selected subscription rate on navigation
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        const formValue = this.myForm.value;
        this.store.dispatch(updateSubscriptionRate({ rate: formValue.subscriptionRate }));
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from observables
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  onRateChange(rate: rate): void {
    this.myForm.get('subscriptionRate')?.setValue(rate);
    this.store.dispatch(updateSubscriptionRate({ rate }));
  }

  onSubmit(): void {
    // Handle form submission logic
    console.log(this.myForm.value);
  }
}
