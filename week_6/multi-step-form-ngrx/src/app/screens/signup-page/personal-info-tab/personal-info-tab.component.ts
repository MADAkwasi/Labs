import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule, ValidatorFn,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { updatePersonalInfo, updatePersonalInfoValidity } from '../../../state/actions/personal-info.action';
import { PersonalInfoState } from '../../../state/reducers/personal-info.reducer';
import { HeadingComponent } from '../../../components/heading/heading.component';
import { InputTextFieldComponent } from '../../../components/input-text-field/input-text-field.component';
import { ButtonComponent } from '../../../components/button/button.component';

@Component({
  selector: 'app-personal-info-tab',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HeadingComponent,
    InputTextFieldComponent,
    ButtonComponent,
  ],
  templateUrl: './personal-info-tab.component.html',
  styleUrls: ['./personal-info-tab.component.css'],
})
export class PersonalInfoTabComponent implements OnInit {
  heading = 'Personal Info';
  details = 'Please provide your name, email address, and phone number';
  myForm!: FormGroup;

  inputFields = [
    { label: 'Name', key: 'name', type: 'text', placeholder: 'e.g. Stephen King' },
    {
      label: 'Email Address',
      key: 'email',
      type: 'email',
      placeholder: 'e.g. stephenking@lorem.com',
    },
    {
      label: 'Phone Number',
      key: 'number',
      type: 'text',
      placeholder: 'e.g. +1 234 567 890',
    },
  ];

  constructor(
    private fb: FormBuilder,
    private store: Store<{ personalInfo: PersonalInfoState }>
  ) {
  }

  get inputFieldsArray(): FormArray {
    return this.myForm.get('textFields') as FormArray;
  }

  ngOnInit(): void {
    const initialState = this.store.select((state) => state.personalInfo);

    initialState.subscribe((state) => {
      this.myForm = this.fb.group({
        textFields: this.fb.array(
          this.inputFields.map((field) => {
            const validators = [
              Validators.required,
              field.label === 'Name'
                ? Validators.pattern(/^[A-Za-z ]+$/)
                : null,
              field.label === 'Email Address'
                ? Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
                : null,
              field.label === 'Phone Number'
                ? Validators.pattern(/^\+?\d{1,4}[\d\s-]+$/)
                : null,
            ].filter((v): v is ValidatorFn => v !== null);

            // Retrieve initial value for the form field from the state
            const initialValue =
              state && field.label === 'Name'
                ? state.name
                : field.label === 'Email Address'
                  ? state.email
                  : field.label === 'Phone Number'
                    ? state.number
                    : '';

            return this.fb.control(initialValue, validators);
          })
        ),
      });

      this.myForm.valueChanges.subscribe((value) => {
        const updatedState: PersonalInfoState = {
          name: value.textFields[0],
          email: value.textFields[1],
          number: value.textFields[2],
          isValid: this.myForm.valid, // Synchronize the validity state
        };

        // Dispatch updates for the personal info and validity
        this.store.dispatch(updatePersonalInfo({ personalInfo: updatedState }));
        this.store.dispatch(updatePersonalInfoValidity({ isValid: this.myForm.valid }));
      });
    });
  }


  onSubmit(): void {
    console.log('Form Submitted', this.myForm.value);
  }
}
