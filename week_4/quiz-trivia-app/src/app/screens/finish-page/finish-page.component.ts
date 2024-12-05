import { Component } from '@angular/core';
import { DescriptionComponent } from '../../description/description.component';
import { ResultComponent } from './result/result.component';

@Component({
  selector: 'app-finish-page',
  standalone: true,
  imports: [DescriptionComponent, ResultComponent],
  templateUrl: './finish-page.component.html',
  styleUrl: './finish-page.component.css',
})
export class FinishPageComponent {
  info = 'Quiz completed ';
  BoldenText = 'You scored...';
}
