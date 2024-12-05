import { Component } from '@angular/core';
import { HeadingComponent } from '../../../components/heading/heading.component';
import { PlanCardComponent } from '../../../components/plan-card/plan-card.component';
import { SubcriptionToggleComponent } from "../../../components/subcription-toggle/subcription-toggle.component";
import { ButtonComponent } from "../../../components/button/button.component";

@Component({
  selector: 'app-plan-tab',
  standalone: true,
  imports: [HeadingComponent, PlanCardComponent, SubcriptionToggleComponent, ButtonComponent],
  templateUrl: './plan-tab.component.html',
  styleUrl: './plan-tab.component.css',
})
export class PlanTabComponent {
  heading = 'Select your plan';
  details = 'You have the option of monthly or yearly billing.';
}
