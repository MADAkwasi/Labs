import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavItem } from './nav-items.model';

@Component({
  selector: 'app-nav-items',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-items.component.html',
  styleUrl: './nav-items.component.css',
})
export class NavItemsComponent {
  navItems: NavItem[] = [
    {
      step: 1,
      name: 'your info',
      link: 'personal-info',
    },
    {
      step: 2,
      name: 'select plan',
      link: 'plan',
    },
    {
      step: 3,
      name: 'add-ons',
      link: 'add-ons',
    },
    {
      step: 4,
      name: 'summary',
      link: 'summary',
    },
  ];
}
