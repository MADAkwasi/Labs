import { Component, Input, OnInit } from '@angular/core';
import { Quiz } from '../data/quiz.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  @Input() subject: Quiz | undefined = undefined;
  isDarkMode = false;

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDarkMode = savedTheme === 'dark-mode';
      document.body.classList.toggle(savedTheme);
    }
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    const theme = this.isDarkMode ? 'dark-mode' : 'light-mode';

    document.body.classList.toggle(theme);
    localStorage.setItem('theme', theme);
  }
}
