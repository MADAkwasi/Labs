import { Component } from '@angular/core';
import { TextField } from './text-field.model';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-text-field-form',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './text-field-form.component.html',
  styleUrl: './text-field-form.component.css',
})
export class TextFieldFormComponent {
  inputFields: TextField[] = [
    { label: 'Name', type: 'text', placeholder: 'e.g. Stephen King' },
    {
      label: 'Email Address',
      type: 'email',
      placeholder: 'e.g. stephenking@lorem.com',
    },
    { label: 'Phone Number', type: 'text', placeholder: 'e.g. +1 234 567 890' },
  ];
}
