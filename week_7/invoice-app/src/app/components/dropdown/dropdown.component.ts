import { Component } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [IconComponent, CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
})
export class DropdownComponent {
  isOpened!: boolean;

  toggleDropdown() {
    this.isOpened = !this.isOpened;
  }
}
