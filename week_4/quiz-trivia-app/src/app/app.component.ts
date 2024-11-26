import { Component, OnInit } from '@angular/core';
import { HomepageComponent } from './screens/homepage/homepage.component';
import { QuizService } from './data/quiz.service';
import { Quiz } from './data/quiz.model';
import { QuizPageComponent } from './screens/quiz-page/quiz-page.component';
import { FinishPageComponent } from "./screens/finish-page/finish-page.component";
import { HeaderComponent } from "./header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomepageComponent, QuizPageComponent, FinishPageComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  screen = 'home';
  questions: Quiz | undefined = undefined;
  currentQuestion!: number;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizService.subject$.subscribe((ques) => {
      this.questions = ques;

      if (ques) this.screen = 'active';
    });

    this.quizService.indexEvent$.subscribe((index) => {
      this.currentQuestion = index;

      if (
        this.questions &&
        this.currentQuestion >= this.questions.questions.length
      )
        this.screen = 'done';
    });
  }
}
