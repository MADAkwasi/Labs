import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../data/quiz.service';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css',
})
export class QuestionComponent implements OnInit {
  num: number = 1;
  question: string = '';
  initialQuestion!: string | undefined;
  questions:
    | { question: string; options: string[]; answer: string }[]
    | undefined = undefined;
  currentQuestion: number | undefined = undefined;
  rangeValue: number = 0;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.initialQuestion =
      this.quizService.getSubjectQuestions()?.questions[0].question;
    this.quizService.answerEvent$.subscribe((ques) => (this.question = ques));

    this.questions = this.quizService.getSubjectQuestions()?.questions;

    this.quizService.indexEvent$.subscribe((index) => {
      this.num = index;
      this.rangeValue = index;
    });

    if (this.questions)
      this.currentQuestion =
        this.questions.findIndex(
          (el) => this.question || this.initialQuestion === el.question
        ) + 1;
  }

  updateRangeValue(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.rangeValue = +inputElement.value;
    this.num = this.rangeValue;
  }
}
