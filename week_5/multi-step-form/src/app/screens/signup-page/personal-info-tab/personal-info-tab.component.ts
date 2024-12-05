import { Component } from '@angular/core';
import { HeadingComponent } from '../../../components/heading/heading.component';
import { InputTextFieldComponent } from '../../../components/input-text-field/input-text-field';
import { ButtonComponent } from "../../../components/button/button.component";

@Component({
  selector: 'app-personal-info-tab',
  standalone: true,
  imports: [HeadingComponent, InputTextFieldComponent, ButtonComponent],
  templateUrl: './personal-info-tab.component.html',
  styleUrl: './personal-info-tab.component.css',
})
export class PersonalInfoTabComponent {
  heading = 'Personal Info';
  details = 'Please provide your name, email address and phone number';
}
