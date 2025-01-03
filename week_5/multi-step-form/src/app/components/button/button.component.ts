import {CommonModule} from '@angular/common';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() backgroundColor!: string;
  @Input() hoveredColor!: string;
  @Input() hoveredBgColor!: string;
  @Input() color!: string;
  @Input() text!: string;
  @Input() url!: string;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled!: boolean;
  @Output() onSubmit = new EventEmitter<boolean>();

  isHovered!: boolean;

  onClick() {
    if (this.type === 'submit') {
      return;
    }

    if (this.type === 'button') {
      localStorage.clear();
      this.onSubmit.emit(true);
    }
  }
}
