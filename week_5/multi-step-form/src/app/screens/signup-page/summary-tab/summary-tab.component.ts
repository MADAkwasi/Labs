import { Component } from '@angular/core';
import { HeadingComponent } from '../../../components/heading/heading.component';

@Component({
  selector: 'app-summary-tab',
  standalone: true,
  imports: [HeadingComponent],
  templateUrl: './summary-tab.component.html',
  styleUrl: './summary-tab.component.css',
})
export class SummaryTabComponent {
  heading = 'Finishing up';
  details = 'Double-check everything looks OK before confirming';
}
