import { Component } from '@angular/core';
import { HeadingComponent } from '../../../components/heading/heading.component';
import { ButtonComponent } from "../../../components/button/button.component";
import { OverviewCardComponent } from "../../../components/overview-card/overview-card.component";

@Component({
  selector: 'app-summary-tab',
  standalone: true,
  imports: [HeadingComponent, ButtonComponent, OverviewCardComponent],
  templateUrl: './summary-tab.component.html',
  styleUrl: './summary-tab.component.css',
})
export class SummaryTabComponent {
  heading = 'Finishing up';
  details = 'Double-check everything looks OK before confirming';
}
