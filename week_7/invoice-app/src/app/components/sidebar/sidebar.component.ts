import { Component } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { AvatarComponent } from '../avatar/avatar.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [IconComponent, AvatarComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {}
