import {Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {HeadingComponent} from '../../../components/heading/heading.component';
import {PlanCardComponent} from '../../../components/plan-card/plan-card.component';
import {SubcriptionToggleComponent} from '../../../components/subcription-toggle/subcription-toggle.component';
import {ButtonComponent} from '../../../components/button/button.component';
import {
  Plan,
  rate,
  selectedPackage,
} from '../../../components/plan-card/plan.model';
import {StorageService} from '../../../storage.service';
import {NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-plan-tab',
  standalone: true,
  imports: [
    HeadingComponent,
    PlanCardComponent,
    SubcriptionToggleComponent,
    ButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './plan-tab.component.html',
  styleUrls: ['./plan-tab.component.css'],
})
export class PlanTabComponent implements OnInit {
  heading = 'Select your plan';
  details = 'You have the option of monthly or yearly billing.';
  plans: Plan[] = [
    {
      icon: 'assets/images/icon-arcade.svg',
      name: 'arcade',
      price: {monthly: '$9/mo', yearly: '$90/yr'},
    },
    {
      icon: 'assets/images/icon-advanced.svg',
      name: 'advanced',
      price: {monthly: '$12/mo', yearly: '$120/yr'},
    },
    {
      icon: 'assets/images/icon-pro.svg',
      name: 'pro',
      price: {monthly: '$15/mo', yearly: '$150/yr'},
    },
  ];
  myForm!: FormGroup;
  isFormValid!: boolean;

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    const storedPlan = this.storageService.getData('subscriptionPlan') || '';
    const storedRate =
      this.storageService.getData('subscriptionRate') || 'monthly';

    const personalFormIsValid = this.storageService.getData<boolean>(
      'personalInfoIsValid'
    );
    const planIsValid = this.storageService.getData<boolean>('planIsValid');

    if (personalFormIsValid && planIsValid)
      this.isFormValid = personalFormIsValid && planIsValid;

    this.myForm = this.fb.group({
      selectedPlan: [storedPlan, Validators.required],
      subscriptionRate: [storedRate],
    });

    this.router.events.subscribe((event) => {
      const formValue = this.myForm.value;

      if (event instanceof NavigationStart) {
        this.storageService.saveData(
          'subscriptionPlan',
          formValue.selectedPlan
        );
        this.storageService.saveData(
          'subscriptionRate',
          formValue.subscriptionRate
        );
        this.storageService.saveData('planIsValid', this.myForm.valid);
      }
    });
  }

  onSubmit(): void {
    const formValue = this.myForm.value;

    this.storageService.saveData('subscriptionPlan', formValue.selectedPlan);
    this.storageService.saveData(
      'subscriptionRate',
      formValue.subscriptionRate
    );
  }

  onPlanSelected(planName: selectedPackage): void {
    this.myForm.get('selectedPlan')?.setValue(planName);
  }
}
