import { Component, OnInit } from '@angular/core';
import { HeadingComponent } from '../../../components/heading/heading.component';
import { InputTextFieldComponent } from '../../../components/input-text-field/input-text-field.component';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { TextField } from '../../../components/input-text-field/text-field.model';
import { StorageService } from '../../../storage.service';
import { NavigationStart, Router } from '@angular/router';
import { ButtonComponent } from '../../../components/button/button.component';

@Component({
  selector: 'app-personal-info-tab',
  standalone: true,
  imports: [
    HeadingComponent,
    InputTextFieldComponent,
    ButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './personal-info-tab.component.html',
  styleUrls: ['./personal-info-tab.component.css'],
})
export class PersonalInfoTabComponent implements OnInit {
  heading = 'Personal Info';
  details = 'Please provide your name, email address, and phone number';
  myForm!: FormGroup;
  inputFields: TextField[] = [
    { label: 'Name', type: 'text', placeholder: 'e.g. Stephen King' },
    {
      label: 'Email Address',
      type: 'email',
      placeholder: 'e.g. stephenking@lorem.com',
    },
    { label: 'Phone Number', type: 'text', placeholder: 'e.g. +1 234 567 890' },
  ];
  inputData: string[] = [];

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private router: Router
  ) {}

  get inputFieldsArray(): FormArray {
    return this.myForm.get('textFields') as FormArray;
  }

  ngOnInit(): void {
    const storedData = this.storageService.getData('personalInfo');

    this.inputData =
      storedData && Array.isArray(storedData)
        ? storedData
        : new Array(this.inputFields.length).fill('');

    this.myForm = this.fb.group({
      textFields: this.fb.array(
        this.inputFields.map((field, index) => {
          const validators = [
            Validators.required,
            field.label === 'Name'
              ? Validators.pattern(/^[A-Za-z ]+$/) // Alphabet-only with spaces
              : null,
            field.label === 'Email Address'
              ? Validators.pattern(
                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                )
              : null,
            field.label === 'Phone Number'
              ? Validators.pattern(/^\+?\d{1,4}[\d\s-]+$/)
              : null,
          ].filter((validator): validator is ValidatorFn => validator !== null);

          return this.fb.control(this.inputData[index], validators);
        })
      ),
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.storageService.saveData(
          'personalInfo',
          this.myForm.value.textFields
        );
        this.storageService.saveData('personalInfoIsValid', this.myForm.valid);
      }
    });
  }

  getEmailValidator() {
    return Validators.pattern(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    );
  }

  getPhoneNumberValidator() {
    return Validators.pattern(/^\+?\d{1,4}[\d\s-]+$/);
  }

  onSubmit(): void {
    this.storageService.saveData('personalInfo', this.myForm.value.textFields);
  }
}
