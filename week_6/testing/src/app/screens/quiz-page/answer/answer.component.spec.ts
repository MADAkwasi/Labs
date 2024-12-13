import { AnswerComponent } from './answer.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuizService } from '../../../data/quiz.service';
import { StorageService } from '../../../storage.service';

describe('Answer Component', () => {
  let component: AnswerComponent;
  let fixture: ComponentFixture<AnswerComponent>;
  let quizService: QuizService;
  let storageService: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AnswerComponent],
      providers: [QuizService, StorageService],
    }).compileComponents();

    quizService = TestBed.inject(QuizService);
    fixture = TestBed.createComponent(AnswerComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it(`Responds correctly to user's answer`, () => {
    // const selectedAnswer = component.onSelectAnswer();
  });
});
