import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Plan, rate, selectedPackage } from './plan.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plan-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plan-card.component.html',
  styleUrl: './plan-card.component.css',
})
export class PlanCardComponent {
  @Output() planSelected = new EventEmitter<selectedPackage>();
  @Input() plans!: Plan[];
  @Input() selectedPlan!: selectedPackage;
  @Input() subscriptionPlan!: rate;

  onSelect(index: number): void {
    const selectedPlanName = this.plans[index].name;
    const selectedPlanPrice = this.plans[index].price[this.subscriptionPlan];
    this.planSelected.emit({
      name: selectedPlanName,
      price: selectedPlanPrice,
    });
  }
}
