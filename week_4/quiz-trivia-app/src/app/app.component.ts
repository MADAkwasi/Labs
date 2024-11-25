import { Component, OnInit } from '@angular/core';
import { HomepageComponent } from './screens/homepage/homepage.component';
import { QuizService } from './data/quiz.service';
import { Quiz } from './data/quiz.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomepageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  screen = 'home';
  questions: Quiz | undefined = undefined;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizService.value$.subscribe((ques) => {
      this.questions = ques;

      if (ques) this.screen = 'active';
    });
  }
}
