import { Injectable } from '@angular/core';
import data from './data.json';
import { Quiz } from './quiz.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private selectedSubject = new BehaviorSubject<Quiz | undefined>(undefined);
  value$ = this.selectedSubject.asObservable();

  getQuizData(): Quiz[] {
    return data.quizzes;
  }

  loadSubjectQuestions(subject: string): void {
    const subjectQuestions = data.quizzes.find(
      (quiz) => quiz.title === subject
    );

    this.selectedSubject.next(subjectQuestions);
  }

  getSubjectQuestions(): Quiz | undefined {
    return this.selectedSubject.getValue();
  }
}
