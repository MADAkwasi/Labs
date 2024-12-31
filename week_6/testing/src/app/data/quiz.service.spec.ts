import { TestBed } from '@angular/core/testing';
import { QuizService } from './quiz.service';
import { QuestionData, Quiz } from './quiz.model';

describe('Quiz Service', () => {
  let service: QuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should increment score if the answer is correct', () => {
    const initialScore = service.score.getValue();
    const point = 0;
    const isCorrect = true;

    const newScore = service.calculateScore(point, isCorrect);

    expect(newScore).toBe(initialScore + 1);
    expect(service.score.getValue()).toBe(initialScore + 1);
  });

  it('should return true if the selected answer is correct', () => {
    const service = TestBed.inject(QuizService);
    const question: QuestionData = {
      question: 'What is HTML?',
      answer: 'Hyper Text Markup Language',
      options: [],
    };

    const selectedAnswer = 'Hyper Text Markup Language';

    const isCorrect = service.isAnswerCorrect(question, selectedAnswer);

    expect(isCorrect).toBe(true);
  });

  it('should return false if the selected answer is incorrect', () => {
    const service = TestBed.inject(QuizService);
    const question: QuestionData = {
      question: 'What is HTML?',
      answer: 'Hyper Text Markup Language',
      options: [],
    };

    const selectedAnswer = 'Incorrect Answer';

    const isCorrect = service.isAnswerCorrect(question, selectedAnswer);

    expect(isCorrect).toBe(false);
  });

  it('should return the selected subject', () => {
    const service = TestBed.inject(QuizService);

    const mockQuiz: Quiz = { title: 'HTML', questions: [], icon: 'icon.svg' };
    service['selectedSubject'].next(mockQuiz);

    const subject = service.getSubjectQuestions();

    expect(subject).toEqual(mockQuiz);
  });
});
