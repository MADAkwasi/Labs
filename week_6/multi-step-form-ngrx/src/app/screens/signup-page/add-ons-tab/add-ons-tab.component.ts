import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { updateSelectedAddOns } from '../../../state/actions/add-ons.action';
import { selectSelectedAddOns } from '../../../state/selectors/add-ons.selector';
import { selectSubscriptionRate } from '../../../state/selectors/plan.selector';
import { rate, selectedPackage } from '../../../components/plan-card/plan.model';
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
export class AddOnsTabComponent implements OnInit {
  heading = 'Pick add-ons';
  details = 'Add-ons enhance your gaming experience';

  subscriptionRate$: Observable<rate>;
  selectedAddOns$: Observable<selectedPackage[]>;
  myForm!: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.subscriptionRate$ = this.store.select(selectSubscriptionRate);
    this.selectedAddOns$ = this.store.select(selectSelectedAddOns);
  }

  ngOnInit(): void {
    // Subscribe to selectedAddOns$ to initialize the form with the selected state
    this.selectedAddOns$.subscribe((selectedAddOns) => {
      const formArray = selectedAddOns.map(() => this.fb.control(false));  // Initialize all add-ons as unchecked
      this.myForm = this.fb.group({
        selectedAddOns: this.fb.array(formArray),
      });
    });
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
}
