import { Component, Input, OnInit } from '@angular/core';
import { Quiz } from '../data/quiz.model';
import { StorageService } from '../storage.service';
import { QuizService } from '../data/quiz.service';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgOptimizedImage,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  @Input() subject!: Quiz | null;
  isDarkMode!: boolean;
  screen!: string;

  constructor(
    private storageService: StorageService,
    private quizService: QuizService,
  ) {
  }

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
      this.isDarkMode = savedTheme === 'dark-mode';
      document.body.classList.toggle(savedTheme);
    }

    this.quizService.screen$.subscribe((screen) => {
      const storedScreen = this.storageService.getData<string>('screen');
      this.screen = storedScreen || screen;
    });

    this.subject = this.storageService.getData<Quiz>('selectedSubject');
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    const theme = this.isDarkMode ? 'dark-mode' : 'light-mode';

    document.body.classList.remove(
      this.isDarkMode ? 'light-mode' : 'dark-mode',
    );

    document.body.classList.add(this.isDarkMode ? 'dark-mode' : 'light-mode');

    localStorage.setItem('theme', theme);
  }
}
