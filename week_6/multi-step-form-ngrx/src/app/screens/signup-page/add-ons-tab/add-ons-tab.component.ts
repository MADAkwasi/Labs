import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  FormBuilder,
  FormArray,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { updateSelectedAddOns } from '../../../state/actions/add-ons.action';
import { selectSelectedAddOns } from '../../../state/selectors/add-ons.selector';
import {
  selectPlanIsValid as selectPlanValid,
  selectSubscriptionRate,
} from '../../../state/selectors/plan.selector';
import {
  rate,
  selectedPackage,
} from '../../../components/plan-card/plan.model';
import { HeadingComponent } from '../../../components/heading/heading.component';
import { AddOnItemComponent } from '../../../components/add-on-item/add-on-item.component';
import { ButtonComponent } from '../../../components/button/button.component';

@Component({
  selector: 'app-add-ons-tab',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HeadingComponent,
    AddOnItemComponent,
    ButtonComponent,
  ],
  templateUrl: './add-ons-tab.component.html',
  styleUrls: ['./add-ons-tab.component.css'],
})
export class AddOnsTabComponent implements OnInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);
  private readonly subscriptions: Subscription[] = [];
  heading = 'Pick add-ons';
  details = 'Add-ons enhance your gaming experience';

  subscriptionRate$: Observable<rate>;
  selectedAddOns$: Observable<selectedPackage[]>;
  planValid$: Observable<boolean>;

  formValid: boolean = false;
  myForm!: FormGroup;

  constructor() {
    this.subscriptionRate$ = this.store.select(selectSubscriptionRate);
    this.selectedAddOns$ = this.store.select(selectSelectedAddOns);
    this.planValid$ = this.store.select(selectPlanValid);
  }

  ngOnInit(): void {
    this.selectedAddOns$.subscribe((selectedAddOns) => {
      const formArray = selectedAddOns.map(() => this.fb.control(false));
      this.myForm = this.fb.group({
        selectedAddOns: this.fb.array(formArray),
      });
    });

    const validitySubscription = combineLatest([this.planValid$]).subscribe(
      ([planValid]) => {
        this.formValid = planValid;
      }
    );

    this.subscriptions.push(validitySubscription);
  }

  get selectedAddOnsArray(): FormArray {
    return this.myForm.get('selectedAddOns') as FormArray;
  }

  onSubmit(): void {
    this.selectedAddOns$.subscribe((selectedAddOns) => {
      const selectedAddOnsState = this.selectedAddOnsArray.value
        .map((isChecked: boolean, index: number) => {
          if (isChecked) {
            return selectedAddOns[index];
          }
          return null;
        })
        .filter(Boolean);

      this.store.dispatch(
        updateSelectedAddOns({ selectedAddOns: selectedAddOnsState })
      );
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
