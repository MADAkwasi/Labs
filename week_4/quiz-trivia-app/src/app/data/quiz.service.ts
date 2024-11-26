import { Injectable } from '@angular/core';
import data from './data.json';
import { Quiz } from './quiz.model';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private selectedSubject = new BehaviorSubject<Quiz | undefined>(undefined);
  subject$ = this.selectedSubject.asObservable();

  private submitAnswer = new Subject<string>();
  answerEvent$ = this.submitAnswer.asObservable();

  private currentIndex = new BehaviorSubject<number>(0);
  indexEvent$ = this.currentIndex.asObservable();

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

  handleSubmitAnswer(
    questions: { question: string; options: string[]; answer: string }[],
    curQuestionIndex: number
  ): void {
    this.submitAnswer.next(questions[curQuestionIndex].question);
  }

  handleNextQuestion(index: number): void {
    this.currentIndex.next(index + 1);
  }

  isAnswerCorrect(
    question: { question: string; options: string[]; answer: string },
    selectedAnswer: string
  ): Boolean {
    return selectedAnswer === question.answer;
  }

  getAnswer(question: {
    question: string;
    options: string[];
    answer: string;
  }): string {
    return question.answer;
  }

  getCurrentQuestion(index: number): void {
    this.currentIndex.next(index + 1);
  }
}
