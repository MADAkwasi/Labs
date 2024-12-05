import { Component } from '@angular/core';
import { AddOnItem, rate } from './add-on-item.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-on-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-on-item.component.html',
  styleUrl: './add-on-item.component.css',
})
export class AddOnItemComponent {
  items: AddOnItem[] = [
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

  subscriptionPlan: rate = 'monthly';

  isChecked: boolean[] = Array(this.items.length).fill(false);

  onCheck(event: HTMLInputElement, index: number) {
    this.isChecked[index] = event.checked;
  }
}
