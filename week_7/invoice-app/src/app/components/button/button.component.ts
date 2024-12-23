import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() type: 'normal' | 'edit' | 'delete' = 'normal';
  @Input() color!: string;
  @Input() disabled!: boolean;
  @Output() onClick = new EventEmitter();

  handleClick() {
    this.onClick.emit();
  }
}
