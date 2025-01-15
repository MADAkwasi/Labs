import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectDarkModeState } from '../../state/selectors/interactions.selector';
import { interactionsActions } from '../../state/actions/interactions.action';
import { ResizeService } from '../../resize.service';

@Component({
  selector: 'app-theme-toggler',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-toggler.component.html',
  styleUrl: './theme-toggler.component.css',
})
export class ThemeTogglerComponent {
  private readonly resizeService = inject(ResizeService);
  private readonly store = inject(Store);
  deviceWidth!: number;
  isDarkMode = this.store.selectSignal(selectDarkModeState);

  constructor() {
    this.resizeService.deviceWidth$.subscribe((width) => {
      this.deviceWidth = width;
    });
  }

  ngOnInit(): void {
    this.initializeTheme();
  }

  toggleTheme(): void {
    const newThemeState = !this.isDarkMode();
    this.store.dispatch(interactionsActions.toggleTheme());
    this.updateTheme(newThemeState);
  }

  private initializeTheme(): void {
    const savedTheme = localStorage.getItem('darkMode') === 'true';
    this.updateTheme(savedTheme);
    if (savedTheme !== this.isDarkMode()) {
      this.store.dispatch(interactionsActions.toggleTheme());
    }
  }

  private updateTheme(isDark: boolean): void {
    if (isDark) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'false');
    }
  }
}
