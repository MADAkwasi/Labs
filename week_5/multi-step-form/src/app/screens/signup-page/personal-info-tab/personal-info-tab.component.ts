import { Component } from '@angular/core';
import { HeadingComponent } from '../../../components/heading/heading.component';
import { TextFieldFormComponent } from '../../../components/text-field-form/text-field-form.component';

@Component({
  selector: 'app-personal-info-tab',
  standalone: true,
  imports: [HeadingComponent, TextFieldFormComponent],
  templateUrl: './personal-info-tab.component.html',
  styleUrl: './personal-info-tab.component.css',
})
export class PersonalInfoTabComponent {
  heading = 'Personal Info';
  details = 'Please provide your name, email address and phone number';
}
