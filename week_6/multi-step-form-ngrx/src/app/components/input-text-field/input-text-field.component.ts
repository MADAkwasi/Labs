import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  FormArray,
  FormControl,
  ReactiveFormsModule,
  ValidationErrors,
  FormBuilder,
  Validators,
  ValidatorFn,
} from '@angular/forms';
import { PersonalInfoState } from '../../state/reducers/personal-info.reducer';
import { updatePersonalInfo } from '../../state/actions/personal-info.action';

@Component({
  selector: 'app-input-text-field',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input-text-field.component.html',
  styleUrls: ['./input-text-field.component.css'],
})
export class InputTextFieldComponent implements OnInit {
  inputFields = [
    { label: 'Name', key: 'name', type: 'text', placeholder: 'e.g. Stephen King' },
    { label: 'Email Address', key: 'email', type: 'email', placeholder: 'e.g. stephenking@lorem.com' },
    { label: 'Phone Number', key: 'number', type: 'text', placeholder: 'e.g. +1 234 567 890' },
  ];
  formArray!: FormArray;
  errors!: ValidationErrors | null;

  constructor(private fb: FormBuilder, private store: Store<{ personalInfo: PersonalInfoState }>) {}

  ngOnInit(): void {
    this.store.select((state) => state.personalInfo).subscribe((state) => {
      this.formArray = this.fb.array(
        this.inputFields.map((field) => {
          const validators = [
            Validators.required,
            field.key === 'email'
              ? Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
              : null,
            field.key === 'number'
              ? Validators.pattern(/^\+?\d{1,4}[\d\s-]+$/)
              : null,
          ].filter((v): v is ValidatorFn => v !== null);

          const initialValue =
            field.key === 'name'
              ? state.name
              : field.key === 'email'
                ? state.email
                : field.key === 'number'
                  ? state.number
                  : '';

          return this.fb.control(initialValue, validators);
        })
      );

      // Update store when formArray changes
      this.formArray.valueChanges.subscribe((value) => {
        const updatedState: PersonalInfoState = {
          name: value[0],
          email: value[1],
          number: value[2],
          isValid: this.formArray.valid,
        };
        this.store.dispatch(updatePersonalInfo({ personalInfo: updatedState }));
      });
    });
  }


  getFormControl(index: number): FormControl {
    return this.formArray.at(index) as FormControl;
  }

  hasError(index: number): boolean {
    const control = this.getFormControl(index);
    this.errors = control.errors;
    return control.touched && control.invalid;
  }
}
