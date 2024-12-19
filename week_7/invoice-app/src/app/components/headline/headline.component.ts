import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';
import { DropdownComponent } from "../dropdown/dropdown.component";

@Component({
  selector: 'app-headline',
  standalone: true,
  imports: [ButtonComponent, IconComponent, DropdownComponent],
  templateUrl: './headline.component.html',
  styleUrl: './headline.component.css',
})
export class HeadlineComponent {
  
}
