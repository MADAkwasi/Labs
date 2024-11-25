import { Component } from '@angular/core';
import { HomepageComponent } from './screens/homepage/homepage.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomepageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'quiz-trivia-app';
}
