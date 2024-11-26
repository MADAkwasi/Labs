import { Component } from '@angular/core';
import { QuestionComponent } from './question/question.component';
import { AnswerComponent } from './answer/answer.component';

@Component({
  selector: 'app-quiz-page',
  standalone: true,
  imports: [QuestionComponent, AnswerComponent],
  templateUrl: './quiz-page.component.html',
  styleUrl: './quiz-page.component.css',
})
export class QuizPageComponent {
  questionNum: number = 0;
}
