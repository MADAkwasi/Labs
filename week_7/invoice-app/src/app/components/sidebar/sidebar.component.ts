import { Component, HostListener, OnInit } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { AvatarComponent } from '../avatar/avatar.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [IconComponent, AvatarComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  deviceWidth: number = window.innerWidth;
  isDarkMode!: boolean;

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('darkMode') === 'true';
    this.isDarkMode = savedTheme;
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    }
  }

  @HostListener('window: resize', ['$event'])
  onResize(event: Event): void {
    this.deviceWidth = window.innerWidth;
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', this.isDarkMode.toString());
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
}
