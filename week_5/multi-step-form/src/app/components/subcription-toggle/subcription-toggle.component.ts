import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { rate } from '../plan-card/plan.model';

@Component({
  selector: 'app-subcription-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subcription-toggle.component.html',
  styleUrl: './subcription-toggle.component.css',
})
export class SubcriptionToggleComponent {
  @Input() selectedRate: rate = 'monthly';
  @Output() rateChange = new EventEmitter<rate>();

  onToggle() {
    this.selectedRate = this.selectedRate === 'monthly' ? 'yearly' : 'monthly';
    this.rateChange.emit(this.selectedRate);
  }
}
