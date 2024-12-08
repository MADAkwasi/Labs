import { Component, OnInit } from '@angular/core';
import { HeadingComponent } from '../../../components/heading/heading.component';
import { AddOnItemComponent } from '../../../components/add-on-item/add-on-item.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { AddOnItem } from '../../../components/add-on-item/add-on-item.model';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { StorageService } from '../../../storage.service';
import { rate } from '../../../components/plan-card/plan.model';

@Component({
  selector: 'app-add-ons-tab',
  standalone: true,
  imports: [
    HeadingComponent,
    AddOnItemComponent,
    ButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './add-ons-tab.component.html',
  styleUrls: ['./add-ons-tab.component.css'],
})
export class AddOnsTabComponent implements OnInit {
  heading = 'Pick add-ons';
  details = 'Add-ons enhance your gaming experience';

  addOnItems: AddOnItem[] = [
    {
      name: 'Online Service',
      description: 'Access to multiplayer games',
      price: { monthly: '$1/mo', yearly: '$10/yr' },
    },
    {
      name: 'Larger Storage',
      description: 'Extra 1TB of cloud save',
      price: { monthly: '$2/mo', yearly: '$20/yr' },
    },
    {
      name: 'Customizable Profile',
      description: 'Custom theme on your profile',
      price: { monthly: '$2/mo', yearly: '$20/yr' },
    },
  ];

  myForm!: FormGroup;
  subscriptionRate!: rate;

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    const storedAddOns: string[] = this.storageService.getData('addOns') || [];
    const storedRate =
      this.storageService.getData('subscriptionRate') || 'monthly';

    this.subscriptionRate =
      storedRate === 'monthly' || storedRate === 'yearly'
        ? storedRate
        : 'monthly';

    this.myForm = this.fb.group({
      selectedAddOns: this.fb.array(
        this.addOnItems.map((item) =>
          this.fb.control(storedAddOns.includes(item.name))
        )
      ),
    });
  }

  get selectedAddOnsArray(): FormArray {
    return this.myForm.get('selectedAddOns') as FormArray;
  }

  onSelectionChanged(isChecked: boolean[]): void {
    this.selectedAddOnsArray.clear();
    isChecked.forEach((checked, i) => {
      if (checked) {
        this.selectedAddOnsArray.push(
          this.fb.control({
            name: this.addOnItems[i].name,
            price: this.addOnItems[i].price[this.subscriptionRate],
          })
        );
      }
    });
  }

  onSubmit(): void {
    const selectedAddOns = this.addOnItems.filter((_, i) => {
      const control = this.selectedAddOnsArray.at(i);
      return control && control.value === true;
    });

    console.log(selectedAddOns);

    this.storageService.saveData(
      'addOns',
      selectedAddOns.map((item) => ({
        name: item.name,
        price: item.price[this.subscriptionRate],
      }))
    );
  }
}
