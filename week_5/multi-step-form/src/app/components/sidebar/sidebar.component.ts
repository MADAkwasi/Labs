import { Component } from '@angular/core';
import { NavItemsComponent } from './nav-items/nav-items.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NavItemsComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {}
