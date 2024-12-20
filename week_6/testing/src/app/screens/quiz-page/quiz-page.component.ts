import { Component, OnInit } from '@angular/core';
import { AnswerComponent } from './answer/answer.component';
import { QuestionComponent } from './question/question.component';

@Component({
  selector: 'app-quiz-page',
  standalone: true,
  imports: [AnswerComponent, QuestionComponent],
  templateUrl: './quiz-page.component.html',
  styleUrl: './quiz-page.component.css',
})
export class QuizPageComponent {}
