import { Component, OnInit } from '@angular/core';
import { Quiz } from '../data/quiz.model';
import { QuizService } from '../data/quiz.service';

@Component({
  selector: 'app-option',
  standalone: true,
  imports: [],
  templateUrl: './option.component.html',
  styleUrl: './option.component.css',
})
export class OptionComponent implements OnInit {
  quizzes: Quiz[] = [];

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizzes = this.quizService.getQuizData();
  }

  onSelectSubject(element: HTMLElement) {
    const title = element.textContent;

    if (!title) return;

    this.quizService.loadSubjectQuestions(title);
  }
}
