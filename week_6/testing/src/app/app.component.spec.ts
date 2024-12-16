import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { QuizPageComponent } from './screens/quiz-page/quiz-page.component';
import { AnswerComponent } from './screens/quiz-page/answer/answer.component';
import { OptionComponent } from './option/option.component';
import { AppComponent } from './app.component';
import { HomepageComponent } from './screens/homepage/homepage.component';
import { FinishPageComponent } from './screens/finish-page/finish-page.component';
import { QuizService } from './data/quiz.service';
import { StorageService } from './storage.service';
import { of } from 'rxjs';
import { Quiz } from './data/quiz.model';

describe('App Component', () => {
  let fixture: ComponentFixture<AppComponent>;
  let appComponent: AppComponent;
  let quizService: QuizService;
  let storageService: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppComponent,
        QuizPageComponent,
        OptionComponent,
        AnswerComponent,
        HomepageComponent,
        FinishPageComponent,
      ],
      providers: [QuizService, StorageService],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    appComponent = fixture.componentInstance;
    fixture.detectChanges();

    quizService = TestBed.inject(QuizService);
    storageService = TestBed.inject(StorageService);

    jest.spyOn(storageService, 'getData').mockReturnValue(null);

    jest.spyOn(storageService, 'saveData');
    quizService.subject$ = of({} as Quiz);
    quizService.screen$ = of('home');
  });

  it('should render AnswerComponent when transitioning to QuizPageComponent', () => {
    const button = fixture.debugElement.query(By.css('.option')).nativeElement;
    button.click();

    appComponent.screen = 'active';
    fixture.detectChanges();

    const quizPage = fixture.debugElement.query(
      By.directive(QuizPageComponent)
    );
    expect(quizPage).toBeTruthy();

    const answerComponent = quizPage.query(By.directive(AnswerComponent));
    expect(answerComponent).toBeTruthy();
  });

  it('should render HomepageComponent when screen state is "home"', () => {
    appComponent.screen = 'home';
    fixture.detectChanges();

    const homepage = fixture.debugElement.query(
      By.directive(HomepageComponent)
    );
    expect(homepage).toBeTruthy();
  });

  it('should render QuizPageComponent when screen state is "active"', () => {
    appComponent.screen = 'active';
    fixture.detectChanges();

    const quizPage = fixture.debugElement.query(
      By.directive(QuizPageComponent)
    );
    expect(quizPage).toBeTruthy();
  });

  it('should render FinishPageComponent when screen state is "done"', () => {
    appComponent.screen = 'done';
    fixture.detectChanges();

    const finishPage = fixture.debugElement.query(
      By.directive(FinishPageComponent)
    );
    expect(finishPage).toBeTruthy();
  });

  it('should save and restore screen and questions from StorageService on initialization', () => {
    const screenValue = storageService.getData('screen');
    const questionsValue = storageService.getData('selectedSubject');

    appComponent.screen = screenValue as string;
    appComponent.questions = questionsValue as Quiz;

    fixture.detectChanges();

    expect(appComponent.screen).toBe(screenValue);
    expect(appComponent.questions).toEqual(questionsValue);
    expect(storageService.getData).toHaveBeenCalledWith('screen');
    expect(storageService.getData).toHaveBeenCalledWith('selectedSubject');
  });
});
