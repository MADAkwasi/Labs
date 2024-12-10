import { Component, OnInit, Renderer2 } from '@angular/core';
import {
  NavigationStart,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { NavItem } from './nav-items.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-items',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './nav-items.component.html',
  styleUrl: './nav-items.component.css',
})
export class NavItemsComponent implements OnInit {
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
  screenWidth!: number;
  activeUrl = 'personal-info';

  constructor(private renderer: Renderer2, private router: Router) {}

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;

    this.renderer.listen(
      'window',
      'resize',
      (e) => (this.screenWidth = e.target.innerWidth)
    );

    const page = this.router.url.split('/').pop();
    if (page) this.activeUrl = page;

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        const page = event.url.split('/').pop();
        if (page) this.activeUrl = page;
      }
    });
  }
}
