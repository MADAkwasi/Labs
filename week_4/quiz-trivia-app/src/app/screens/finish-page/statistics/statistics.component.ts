import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../data/quiz.service';
import { Quiz } from '../../../data/quiz.model';

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

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizService.subject$.subscribe((quiz) => (this.subject = quiz));
    this.quizService.score$.subscribe((points) => (this.totalScore = points));
  }

  handlePlayAgain() {
    this.quizService.loadScreen('home');
  }
}
