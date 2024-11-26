import { Component, Input, OnInit } from '@angular/core';
import { QuizService } from '../../../data/quiz.service';
import { Quiz } from '../../../data/quiz.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-answer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './answer.component.html',
  styleUrl: './answer.component.css',
})
export class AnswerComponent implements OnInit {
  @Input() subjectObject!: Quiz | undefined;

  num: number = 0;
  answers!: string[];
  currentAnswer = this.subjectObject?.questions[this.num].answer;
  selectedAnswer: string | null = null;
  letter: string[] = ['A', 'B', 'C', 'D'];
  hoverIndex: number = -1;
  selectIndex: number = -1;
  isCorrect!: Boolean;
  isSubmitted: Boolean = false;
  renderWarning: Boolean = false;
  correctAnswer!: string;
  correctAnswerIndex!: number;
  totalQuestions: number | undefined = undefined;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizService.subject$.subscribe((ques) => (this.subjectObject = ques));
    this.totalQuestions = this.subjectObject?.questions.length;
    if (this.subjectObject)
      this.answers = this.subjectObject.questions[0].options;
  }

  onSubmitAnswer(): void {
    if (!this.selectedAnswer) this.renderWarning = true;

    if (this.subjectObject && this.selectedAnswer) {
      this.isCorrect = this.quizService.isAnswerCorrect(
        this.subjectObject.questions[this.num],
        this.selectedAnswer
      );
      this.isSubmitted = true;

      this.correctAnswer = this.quizService.getAnswer(
        this.subjectObject.questions[this.num]
      );

      this.correctAnswerIndex = this.answers.findIndex(
        (ans) => ans === this.correctAnswer
      );
    }
  }

  onNextQuestion(): void {
    if (this.totalQuestions && this.num + 1 >= this.totalQuestions) {
      return;
    }

    if (this.subjectObject) {
      this.num++;
      this.answers = this.subjectObject.questions[this.num].options;
      this.quizService.handleSubmitAnswer(
        this.subjectObject.questions,
        this.num
      );

      this.quizService.handleNextQuestion(this.num);
    }
    this.isSubmitted = false;
    this.isCorrect = false;
    this.selectedAnswer = null;
  }

  onSelectAnswer(element: HTMLElement, index: number): void {
    this.selectedAnswer = element.textContent;
    this.selectIndex = index;
    this.renderWarning = false;

    if (this.subjectObject) {
      console.log(this.subjectObject.questions[this.num]);
    }
  }
}
