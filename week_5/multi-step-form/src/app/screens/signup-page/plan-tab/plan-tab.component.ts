import { Component } from '@angular/core';
import { HeadingComponent } from "../../../components/heading/heading.component";

@Component({
  selector: 'app-plan-tab',
  standalone: true,
  imports: [HeadingComponent],
  templateUrl: './plan-tab.component.html',
  styleUrl: './plan-tab.component.css',
})
export class PlanTabComponent {
  heading = 'Select your plan';
  details = 'You have the option of monthly or yearly billing';
}
