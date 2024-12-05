import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-subcription-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subcription-toggle.component.html',
  styleUrl: './subcription-toggle.component.css',
})
export class SubcriptionToggleComponent {
  isMonthly!: boolean;

  onToggle() {
    this.isMonthly = !this.isMonthly;
  }
}
