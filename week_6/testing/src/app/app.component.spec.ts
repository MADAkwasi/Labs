import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { QuizPageComponent } from './screens/quiz-page/quiz-page.component';
import { AnswerComponent } from './screens/quiz-page/answer/answer.component';
import { OptionComponent } from './option/option.component';
import { AppComponent } from './app.component';

describe('App Component', () => {
  let homePageFixture: ComponentFixture<AppComponent>;
  let appComponent: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppComponent,
        QuizPageComponent,
        OptionComponent,
        AnswerComponent,
      ],
    });

    homePageFixture = TestBed.createComponent(AppComponent);
    appComponent = homePageFixture.componentInstance;
    homePageFixture.detectChanges();
  });

  it('should render AnswerComponent when transitioning to QuizPageComponent', () => {
    const button = homePageFixture.debugElement.query(By.css('.option')).nativeElement;
    button.click();

    appComponent.screen = 'active';
    homePageFixture.detectChanges();

    const quizPage = homePageFixture.debugElement.query(By.directive(QuizPageComponent));
    expect(quizPage).toBeTruthy();

    const answerComponent = quizPage.query(By.directive(AnswerComponent));
    expect(answerComponent).toBeTruthy();
  });
});
