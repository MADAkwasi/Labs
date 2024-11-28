import { Component } from '@angular/core';
import { DescriptionComponent } from '../homepage/description/description.component';
import { StatisticsComponent } from './statistics/statistics.component';

@Component({
  selector: 'app-finish-page',
  standalone: true,
  imports: [DescriptionComponent, StatisticsComponent],
  templateUrl: './finish-page.component.html',
  styleUrl: './finish-page.component.css',
})
export class FinishPageComponent {
  info: string = 'Quiz completed ';
  BoldenText: string = 'You scored...';
}
