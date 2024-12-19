import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.css',
})
export class IconComponent {
  @Input() imgSrc!: string;
  @Input() altText!: string;
  @Input() width!: number;
  @Input() height!: number;
  @Input() rotate!: string;
  @Input() isInteractive = true;
}
