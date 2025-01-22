import { Component, Input, inject } from '@angular/core';
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
  isLoggingOut!: boolean;
  @Input() width!: number;
  @Input() height!: number;

  handlelogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  handleToggleDropdown(): void {
    this.isLoggingOut = !this.isLoggingOut;
  }
}
