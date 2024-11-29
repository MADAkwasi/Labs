import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../data/quiz.service';
import { Quiz } from '../../../data/quiz.model';
import { StorageService } from '../../../storage.service';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css',
})
export class StatisticsComponent implements OnInit {
  subject: Quiz | undefined = undefined;
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

    const storedSubject = this.storedService.getData<Quiz>('selectedSubject');
    this.subject = storedSubject || undefined;
  }

  handlePlayAgain() {
    const storedTheme = this.storedService.getData<boolean>('theme');
    console.log(storedTheme);
    this.storedService.saveData('screen', 'home');
    localStorage.clear();
    this.quizService.loadScreen('home');

    if (storedTheme) this.storedService.saveData('theme', storedTheme);
  }
}
