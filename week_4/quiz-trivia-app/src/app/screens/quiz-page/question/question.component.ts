import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../data/quiz.service';
import { StorageService } from '../../../storage.service';
import { Quiz } from '../../../data/quiz.model';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css',
})
export class QuestionComponent implements OnInit {
  num = 1;
  question = '';
  initialQuestion!: string | undefined;
  questions:
    | { question: string; options: string[]; answer: string }[]
    | undefined = undefined;
  rangeValue = 0;

  constructor(
    private quizService: QuizService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    const subjectQuestions = this.quizService.getSubjectQuestions();
    this.initialQuestion = subjectQuestions?.questions[0]?.question;
    this.questions = subjectQuestions?.questions;

    const storedQuestions =
      this.storageService.getData<Quiz>('selectedSubject')?.questions;
    const storedQuestion =
      this.storageService.getData<string>('currentQuestion');
    const storedNumber = this.storageService.getData<number>('questionNumber');

    this.questions = storedQuestions ?? this.questions;
    this.question = storedQuestion ?? this.initialQuestion ?? '';
    this.num = storedNumber ?? 1;
    this.rangeValue = this.num;
    this.quizService.handleNextQuestion(this.num - 1);

    this.quizService.answerEvent$.subscribe((ques) => {
      this.question = ques;
      this.storageService.saveData('questionNumber', this.question);
    });

    this.quizService.indexEvent$.subscribe((index) => {
      this.num = index;
      this.storageService.saveData('questionNumber', this.num);
      this.rangeValue = index;
    });
  }

  updateRangeValue(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.rangeValue = +inputElement.value;
    this.num = this.rangeValue;
    this.storageService.saveData('questionNumber', this.num);
  }
}
