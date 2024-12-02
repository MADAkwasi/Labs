import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { QuizService } from '../../../data/quiz.service';
import { Quiz } from '../../../data/quiz.model';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../../storage.service';

@Component({
  selector: 'app-answer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './answer.component.html',
  styleUrl: './answer.component.css',
})
export class AnswerComponent implements OnInit, AfterViewInit {
  @Input() subjectObject: Quiz | null = null;

  num = 0;
  answers!: string[];
  currentAnswer = this.subjectObject?.questions[this.num].answer;
  selectedAnswer: string | null = null;
  letter: string[] = ['A', 'B', 'C', 'D'];
  hoverIndex = -1;
  selectIndex = -1;
  isCorrect!: boolean;
  isSubmitted = false;
  renderWarning = false;
  correctAnswer!: string;
  correctAnswerIndex!: number;
  totalQuestions: number = 0;
  score = 0;

  constructor(
    private quizService: QuizService,
    private storageService: StorageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      const storedCorrectAnswerIndex =
        this.storageService.getData<number>('correctAnswerIndex');
      this.correctAnswerIndex = storedCorrectAnswerIndex ?? -1;

      const storedSubmitState =
        this.storageService.getData<boolean>('isSubmitted');
      this.isSubmitted = storedSubmitState ?? false;
    });

    const savedAnswers =
      this.storageService.getData<string[]>('possibleAnswers');
    this.answers = savedAnswers ?? [];

    const storedSubject = this.storageService.getData<Quiz>('selectedSubject');
    this.subjectObject = storedSubject ?? null;

    const storedScore = this.storageService.getData<number>('scorePoints');
    this.score = storedScore ?? 0;

    const storedIndex = this.storageService.getData<number>(
      'currentQuestionIndex'
    );
    this.num = storedIndex ?? 0;

    const storedSubmitState =
      this.storageService.getData<boolean>('isSubmitted');
    this.isSubmitted = storedSubmitState ?? false;

    const storedAnswer = this.storageService.getData<string>('selectedAnswer');
    this.selectedAnswer = storedAnswer ?? null;

    const storedIsCorrectState =
      this.storageService.getData<boolean>('isCorrect');
    this.isCorrect = storedIsCorrectState ?? false;

    const savedIndex = this.storageService.getData<number>(
      'selectedAnswerIndex'
    );
    if (savedIndex !== null && savedIndex >= 0) {
      this.selectIndex = savedIndex;
    }

    const storedCorrectAnswerIndex =
      this.storageService.getData<number>('correctAnswerIndex');
    const storedCorrectAnswer =
      this.storageService.getData<string>('correctAnswer');
    this.correctAnswerIndex = storedCorrectAnswerIndex ?? -1;
    this.correctAnswer = storedCorrectAnswer ?? '';

    if (!this.subjectObject) {
      this.quizService.subject$.subscribe((ques) => {
        this.subjectObject = ques;
        this.storageService.saveData('selectedSubject', this.subjectObject);
      });
    }
    if (this.subjectObject)
      this.totalQuestions = this.subjectObject.questions.length;

    if (!savedAnswers && this.subjectObject) {
      this.answers = this.subjectObject.questions[0].options;
      this.storageService.saveData('possibleAnswers', this.answers);
    }

    this.cdr.detectChanges();
  }

  ngAfterViewInit(): void {
    const storedCorrectAnswerIndex =
      this.storageService.getData<number>('correctAnswerIndex');
    const storedCorrectAnswer =
      this.storageService.getData<string>('correctAnswer');
    this.correctAnswerIndex = storedCorrectAnswerIndex ?? -1;
    this.correctAnswer = storedCorrectAnswer ?? '';

    const storedSubmitState =
      this.storageService.getData<boolean>('isSubmitted');
    this.isSubmitted = storedSubmitState ?? false;

    this.cdr.detectChanges();
  }

  onSubmitAnswer(): void {
    if (!this.selectedAnswer) {
      this.renderWarning = true;
      return;
    }

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

      this.storageService.saveData('isCorrect', this.isCorrect);
      this.storageService.saveData('isSubmitted', this.isSubmitted);
      this.storageService.saveData(
        'correctAnswerIndex',
        this.correctAnswerIndex
      );
      this.storageService.saveData('correctAnswer', this.correctAnswer);
    }

    this.score = this.quizService.calculateScore(this.score, this.isCorrect);
    this.storageService.saveData('scorePoints', this.score);
  }

  onNextQuestion(): void {
    if (this.totalQuestions && this.num + 1 >= this.totalQuestions) {
      this.storageService.saveData('screen', 'done');
      this.quizService.loadScreen('done');
      return;
    }

    if (
      this.subjectObject &&
      this.totalQuestions &&
      this.num + 1 < this.totalQuestions
    ) {
      this.num++;
      this.answers = this.subjectObject.questions[this.num].options;

      this.storageService.saveData('currentQuestionIndex', this.num);
      this.storageService.saveData('possibleAnswers', this.answers);
      this.quizService.handleSubmitAnswer(
        this.subjectObject.questions,
        this.num
      );

      this.quizService.handleNextQuestion(this.num);
    }

    this.isSubmitted = false;
    this.isCorrect = false;
    this.selectedAnswer = null;
    this.selectIndex = -1;

    this.storageService.saveData('isCorrect', this.isCorrect);
    this.storageService.saveData('isSubmitted', this.isSubmitted);
    this.storageService.saveData('selectedAnswer', this.selectedAnswer);
    this.storageService.saveData('selectedAnswerIndex', this.selectIndex);
  }

  onSelectAnswer(element: HTMLElement, index: number): void {
    this.selectedAnswer = element.textContent;
    this.storageService.saveData('selectedAnswer', this.selectedAnswer);

    this.selectIndex = index;
    this.renderWarning = false;

    this.storageService.saveData('selectedAnswerIndex', this.selectIndex);
  }
}
