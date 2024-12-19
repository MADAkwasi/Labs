import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-headline',
  standalone: true,
  imports: [ButtonComponent, IconComponent, FilterComponent],
  templateUrl: './headline.component.html',
  styleUrl: './headline.component.css',
})
export class HeadlineComponent {}
