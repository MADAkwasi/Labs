import { Component, OnInit } from '@angular/core';
import { HeadingComponent } from '../../../components/heading/heading.component';
import { InputTextFieldComponent } from '../../../components/input-text-field/input-text-field.component';
import { ButtonComponent } from '../../../components/button/button.component';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TextField } from '../../../components/input-text-field/text-field.model';
import { StorageService } from '../../../storage.service';
import { NavigationStart, Router } from '@angular/router';

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

  ngOnInit(): void {
    const storedData = this.storageService.getData('personalInfo');

    this.inputData =
      storedData && Array.isArray(storedData)
        ? storedData
        : new Array(this.inputFields.length).fill('');

    this.myForm = this.fb.group({
      textFields: this.fb.array(
        this.inputData.map((value) =>
          this.fb.control(value, Validators.required)
        )
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

  get inputFieldsArray(): FormArray {
    return this.myForm.get('textFields') as FormArray;
  }

  onSubmit(): void {
    this.storageService.saveData('personalInfo', this.myForm.value.textFields);
  }
}
