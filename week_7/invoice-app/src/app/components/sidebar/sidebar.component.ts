import { Component, HostListener } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { AvatarComponent } from '../avatar/avatar.component';
import { ThemeTogglerComponent } from '../theme-toggler/theme-toggler.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [IconComponent, AvatarComponent, ThemeTogglerComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  deviceWidth: number = window.innerWidth;

  @HostListener('window: resize', ['$event'])
  onResize(event: Event): void {
    this.deviceWidth = window.innerWidth;
  }
}
