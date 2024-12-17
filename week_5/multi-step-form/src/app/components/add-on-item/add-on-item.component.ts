import { Component, Input, OnInit } from '@angular/core';
import { AddOnItem, rate } from './add-on-item.model';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { StorageService } from '../../storage.service';
import { Package } from '../overview-card/overview-card.model';

@Component({
  selector: 'app-add-on-item',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-on-item.component.html',
  styleUrls: ['./add-on-item.component.css'],
})
export class AddOnItemComponent implements OnInit {
  @Input() items: AddOnItem[] = [];
  @Input() selectedAddOnsArray!: FormArray;
  @Input() subscriptionPlan!: rate;

  isChecked: boolean[] = [];

  constructor(
    private storageService: StorageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const storedAddOns = this.storageService.getData<Package[]>('addOns') || [];

    this.selectedAddOnsArray.clear();
    this.isChecked = this.items.map((item) => {
      const isStored = storedAddOns.some((addOn) => addOn.name === item.name);
      this.selectedAddOnsArray.push(this.fb.control(isStored));
      return isStored;
    });
  }

  toggleSelection(index: number): void {
    const control = this.selectedAddOnsArray.at(index);

    if (control) {
      const newValue = !control.value;
      control.setValue(newValue);
      this.isChecked[index] = newValue;
    }
  }
}
