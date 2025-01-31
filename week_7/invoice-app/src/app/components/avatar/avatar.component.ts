import { Component, ElementRef, Input, Renderer2, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css',
})
export class AvatarComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly renderer = inject(Renderer2);
  private readonly el = inject(ElementRef);
  isLoggingOut!: boolean;
  @Input() width!: number;
  @Input() height!: number;

  constructor() {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (!this.el.nativeElement.contains(e.target)) {
        this.isLoggingOut = false;
      }
    });
  }

  handlelogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  handleToggleDropdown(): void {
    this.isLoggingOut = !this.isLoggingOut;
  }
}
