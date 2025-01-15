import { Component, inject } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { AvatarComponent } from '../avatar/avatar.component';
import { ThemeTogglerComponent } from '../theme-toggler/theme-toggler.component';
import { ResizeService } from '../../resize.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [IconComponent, AvatarComponent, ThemeTogglerComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  private readonly resizeService = inject(ResizeService);
  deviceWidth!: number;

  constructor() {
    this.resizeService.deviceWidth$.subscribe((width) => {
      this.deviceWidth = width;
    });
  }
}
