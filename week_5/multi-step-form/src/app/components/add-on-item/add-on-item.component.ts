import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AddOnItem, rate } from './add-on-item.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-on-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-on-item.component.html',
  styleUrls: ['./add-on-item.component.css'],
})
export class AddOnItemComponent {
  @Input() items: AddOnItem[] = [];
  @Output() selectionChanged = new EventEmitter<boolean[]>();
  @Input() subscriptionPlan!: rate;

  isChecked: boolean[] = Array(this.items.length).fill(false);

  onDivClick(index: number): void {
    this.isChecked[index] = !this.isChecked[index];
    this.selectionChanged.emit(this.isChecked);
    console.log(this.subscriptionPlan);
  }

  onCheckboxClick(event: Event): void {
    event.stopPropagation();
  }
}
