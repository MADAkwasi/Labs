import { Component, OnInit } from '@angular/core';
import { HomepageComponent } from './screens/homepage/homepage.component';
import { QuizService } from './data/quiz.service';
import { Quiz } from './data/quiz.model';
import { QuizPageComponent } from './screens/quiz-page/quiz-page.component';
import { FinishPageComponent } from './screens/finish-page/finish-page.component';
import { HeaderComponent } from './header/header.component';
import { StorageService } from './storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HomepageComponent,
    QuizPageComponent,
    FinishPageComponent,
    HeaderComponent,
  ],
  providers: [StorageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  screen = 'home';
  questions: Quiz | undefined = undefined;
  currentQuestion!: number;

  constructor(
    private quizService: QuizService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    const storedScreen = this.storageService.getData<string>('screen');
    const storedQuestions =
      this.storageService.getData<Quiz>('selectedSubject');

    this.screen = storedScreen ?? 'home';
    this.questions = storedQuestions ?? undefined;

    this.quizService.subject$.subscribe((ques) => {
      this.questions = ques;

      if (ques) {
        this.screen = 'active';
        this.storageService.saveData('selectedSubject', this.questions);
        this.storageService.saveData('screen', this.screen);
      }
    });

    this.quizService.screen$.subscribe((screen) => {
      const storedScreen = this.storageService.getData<string>('screen');
      this.screen = storedScreen || screen;
    });
  }
}