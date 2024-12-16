import { Injectable } from '@angular/core';
import data from './data.json';
import { QuestionData, Quiz } from './quiz.model';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private selectedSubject = new BehaviorSubject<Quiz | {}>({});
  private screenSubject = new BehaviorSubject<string>('home');
  private submitAnswer = new Subject<string>();
  private currentIndex = new BehaviorSubject<number>(0);
  public score = new BehaviorSubject<number>(0);

  public subject$ = this.selectedSubject.asObservable();
  public screen$ = this.screenSubject.asObservable();
  public answerEvent$ = this.submitAnswer.asObservable();
  public indexEvent$ = this.currentIndex.asObservable();
  public score$ = this.score.asObservable();

  public getQuizData(): Quiz[] {
    return data.quizzes;
  }

  public loadSubjectQuestions(subject: string): void {
    const subjectQuestions = data.quizzes.find(
      (quiz) => quiz.title === subject
    );

    if (subjectQuestions) this.selectedSubject.next(subjectQuestions);
  }

  public calculateScore(point: number, isCorrect: boolean): number {
    if (isCorrect) point++;

    this.score.next(point);

    return point;
  }

  public loadScreen(screen: string): void {
    this.screenSubject.next(screen);
  }

  public getSubjectQuestions(): Quiz | {} {
    return this.selectedSubject.getValue();
  }

  public handleSubmitAnswer(
    questions: QuestionData[],
    curQuestionIndex: number
  ): void {
    const currentQuestion = questions[curQuestionIndex].question;
    this.submitAnswer.next(currentQuestion);
  }

  public handleNextQuestion(index: number): void {
    this.currentIndex.next(index + 1);
  }

  public isAnswerCorrect(
    question: QuestionData,
    selectedAnswer: string
  ): boolean {
    return selectedAnswer === question.answer;
  }

  public getAnswer(question: QuestionData): string {
    return question.answer;
  }

  public getCurrentQuestion(index: number): void {
    this.currentIndex.next(index + 1);
  }
}
