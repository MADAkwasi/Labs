import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { updateSelectedAddOns } from '../../../state/actions/add-ons.action';
import { selectSelectedAddOns } from '../../../state/selectors/add-ons.selector';
import { selectPlanIsValid as selectPlanValid, selectSubscriptionRate } from '../../../state/selectors/plan.selector'; // Plan validity selector
import {  selectPersonalInfoValid } from '../../../state/selectors/personal-info.selector'; // Personal Info validity selector
import { rate, selectedPackage } from '../../../components/plan-card/plan.model';
import { HeadingComponent } from '../../../components/heading/heading.component';
import { AddOnItemComponent } from '../../../components/add-on-item/add-on-item.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { combineLatest } from 'rxjs';

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
  heading = 'Pick add-ons';
  details = 'Add-ons enhance your gaming experience';

  subscriptionRate$: Observable<rate>;
  selectedAddOns$: Observable<selectedPackage[]>;
  planValid$: Observable<boolean>;
  // personalInfoValid$: Observable<boolean>;
  formValid: boolean = false;
  myForm!: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder, private store: Store) {
    this.subscriptionRate$ = this.store.select(selectSubscriptionRate);
    this.selectedAddOns$ = this.store.select(selectSelectedAddOns);
    this.planValid$ = this.store.select(selectPlanValid); // Plan validity
    // this.personalInfoValid$ = this.store.select(selectPersonalInfoValid);
  }

  ngOnInit(): void {
    // Initialize the form with selected add-ons
    this.selectedAddOns$.subscribe((selectedAddOns) => {
      const formArray = selectedAddOns.map(() => this.fb.control(false));  // Initialize all add-ons as unchecked
      this.myForm = this.fb.group({
        selectedAddOns: this.fb.array(formArray),
      });
    });

    // Combine the validity of Plan and Personal Info forms
    const validitySubscription = combineLatest([
      this.planValid$,
    ]).subscribe(([planValid]) => {
      this.formValid = planValid; // Set combined form validity
    });

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
            return selectedAddOns[index];  // Get the selected add-ons based on the index
          }
          return null;
        })
        .filter(Boolean);

      // Dispatch selected add-ons to the store
      this.store.dispatch(updateSelectedAddOns({ selectedAddOns: selectedAddOnsState }));
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe()); // Unsubscribe to avoid memory leaks
  }
}
