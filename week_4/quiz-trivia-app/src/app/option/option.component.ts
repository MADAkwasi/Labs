import { Component, OnInit } from '@angular/core';
import { Quiz } from '../data/quiz.model';
import { QuizService } from '../data/quiz.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-option',
  standalone: true,
  imports: [],
  templateUrl: './option.component.html',
  styleUrl: './option.component.css',
})
export class OptionComponent implements OnInit {
  quizzes: Quiz[] = [];

  constructor(
    private quizService: QuizService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.quizzes = this.quizService.getQuizData();
  }

  onSelectSubject(element: HTMLElement) {
    localStorage.removeItem('questionNumber');
    const title = element.textContent;

    if (!title) return;

    this.quizService.loadSubjectQuestions(title);

    const storedSubject = this.storageService.getData<Quiz>('selectedSubject');

    if (storedSubject && storedSubject.questions.length) {
      this.storageService.saveData(
        'currentQuestion',
        storedSubject.questions[0].question
      );
    }

    
    this.quizService.loadScreen('active');
  }
}
