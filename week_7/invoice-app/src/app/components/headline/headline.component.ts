import { Component } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { IconComponent } from "../icon/icon.component";

@Component({
  selector: 'app-headline',
  standalone: true,
  imports: [ButtonComponent, IconComponent],
  templateUrl: './headline.component.html',
  styleUrl: './headline.component.css'
})
export class HeadlineComponent {

}
