import { Injectable } from '@angular/core';
import data from './data.json';
import { QuestionData, Quiz } from './quiz.model';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private selectedSubject = new BehaviorSubject<Quiz | {}>({});
  subject$ = this.selectedSubject.asObservable();

  private screenSubject = new BehaviorSubject<string>('home');
  screen$ = this.screenSubject.asObservable();

  private submitAnswer = new Subject<string>();
  answerEvent$ = this.submitAnswer.asObservable();

  private currentIndex = new BehaviorSubject<number>(0);
  indexEvent$ = this.currentIndex.asObservable();

  private score = new BehaviorSubject<number>(0);
  score$ = this.score.asObservable();

  getQuizData(): Quiz[] {
    return data.quizzes;
  }

  loadSubjectQuestions(subject: string): void {
    const subjectQuestions = data.quizzes.find(
      (quiz) => quiz.title === subject
    );

    if (subjectQuestions) this.selectedSubject.next(subjectQuestions);
  }

  calculateScore(point: number, isCorrect: boolean): number {
    if (isCorrect) point++;

    this.score.next(point);

    return point;
  }

  loadScreen(screen: string): void {
    this.screenSubject.next(screen);
  }

  getSubjectQuestions(): Quiz | {} {
    return this.selectedSubject.getValue();
  }

  handleSubmitAnswer(
    questions: QuestionData[],
    curQuestionIndex: number
  ): void {
    const currentQuestion = questions[curQuestionIndex].question;
    this.submitAnswer.next(currentQuestion);
  }

  handleNextQuestion(index: number): void {
    this.currentIndex.next(index + 1);
  }

  isAnswerCorrect(question: QuestionData, selectedAnswer: string): boolean {
    return selectedAnswer === question.answer;
  }

  getAnswer(question: QuestionData): string {
    return question.answer;
  }

  getCurrentQuestion(index: number): void {
    this.currentIndex.next(index + 1);
  }
}
