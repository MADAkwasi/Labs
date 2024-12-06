import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() backgroundColor!: string;
  @Input() color!: string;
  @Input() text!: string;
  @Input() url!: string;

  onClick(event: Event){
    event.preventDefault()
  }
}
