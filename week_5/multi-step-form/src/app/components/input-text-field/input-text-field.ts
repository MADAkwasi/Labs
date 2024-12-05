import { Component } from '@angular/core';
import { TextField } from './text-field.model';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-input-text-field',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './input-text-field.component.html',
  styleUrl: './input-text-field.component.css',
})
export class InputTextFieldComponent {
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
