import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HeadingComponent } from '../../../components/heading/heading.component';
import { PlanCardComponent } from '../../../components/plan-card/plan-card.component';
import { SubcriptionToggleComponent } from '../../../components/subcription-toggle/subcription-toggle.component';
import { ButtonComponent } from '../../../components/button/button.component';
import {
  Plan,
  rate,
  selectedPackage,
} from '../../../components/plan-card/plan.model';
import { StorageService } from '../../../storage.service';

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
      icon: '/images/icon-arcade.svg',
      name: 'arcade',
      price: { monthly: '$9/mo', yearly: '$90/yr' },
    },
    {
      icon: '/images/icon-advanced.svg',
      name: 'advanced',
      price: { monthly: '$12/mo', yearly: '$120/yr' },
    },
    {
      icon: '/images/icon-pro.svg',
      name: 'pro',
      price: { monthly: '$15/mo', yearly: '$150/yr' },
    },
  ];
  myForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    const storedPlan = this.storageService.getData('subscriptionPlan') || '';
    const storedRate =
      this.storageService.getData('subscripttionRate') || 'monthly';

    this.myForm = this.fb.group({
      selectedPlan: [storedPlan],
      subscripttionRate: [storedRate],
    });
  }

  onSubmit(): void {
    const formValue = this.myForm.value;
    console.log('Form Value:', formValue);

    this.storageService.saveData('subscriptionPlan', formValue.selectedPlan);
    this.storageService.saveData(
      'subscripttionRate',
      formValue.subscripttionRate
    );
  }

  onPlanSelected(planName: selectedPackage): void {
    this.myForm.get('selectedPlan')?.setValue(planName);
  }
}
