import { Component, Input, OnInit } from '@angular/core';
import { Quiz } from '../data/quiz.model';
import { StorageService } from '../storage.service';

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

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDarkMode = savedTheme === 'dark-mode';
      document.body.classList.toggle(savedTheme);
    }

    const storedSubject = this.storageService.getData<Quiz>('selectedSubject');

    if (storedSubject) this.subject = storedSubject;
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    const theme = this.isDarkMode ? 'dark-mode' : 'light-mode';

    document.body.classList.remove(
      this.isDarkMode ? 'light-mode' : 'dark-mode'
    );

    document.body.classList.add(this.isDarkMode ? 'dark-mode' : 'light-mode');

    localStorage.setItem('theme', theme);
  }
}
