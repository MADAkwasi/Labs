import { Component, Input } from '@angular/core';
import { TextField } from './text-field.model';
import {
  FormArray,
  FormControl,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-input-text-field',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input-text-field.component.html',
  styleUrl: './input-text-field.component.css',
})
export class InputTextFieldComponent {
  @Input() inputFields: TextField[] = [];
  @Input() formArray!: FormArray;
  errors!: ValidationErrors | null;

  getFormControl(index: number): FormControl {
    return this.formArray.at(index) as FormControl;
  }

  hasError(index: number): boolean {
    const control = this.getFormControl(index);

    this.errors = control.errors;

    return control.touched && control.invalid;
  }
}
