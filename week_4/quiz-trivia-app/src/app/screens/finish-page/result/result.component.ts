import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../data/quiz.service';
import { Quiz } from '../../../data/quiz.model';
import { StorageService } from '../../../storage.service';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css',
})
export class ResultComponent implements OnInit {
  subject: Quiz | null = null;
  totalScore!: number;
  theme!: string;

  constructor(
    private quizService: QuizService,
    private storedService: StorageService
  ) {}

  ngOnInit(): void {
    this.quizService.subject$.subscribe((quiz) => (this.subject = quiz));
    this.quizService.score$.subscribe((points) => (this.totalScore = points));

    const storedScore = this.storedService.getData<number>('scorePoints');
    this.totalScore = storedScore ?? 0;

    this.subject = this.storedService.getData<Quiz>('selectedSubject');
  }

  handlePlayAgain() {
    const storedTheme = this.storedService.getData<boolean>('theme');
    this.storedService.saveData('screen', 'home');
    localStorage.clear();
    this.quizService.loadScreen('home');

    if (storedTheme) this.storedService.saveData('theme', storedTheme);
  }
}
