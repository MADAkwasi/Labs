import { OptionComponent } from './option.component';
import { QuizService } from '../data/quiz.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { StorageService } from '../storage.service';
import data from '../data/data.json';

describe('optionsComponent', () => {
  let component: OptionComponent;
  let fixture: ComponentFixture<OptionComponent>;
  let quizService: QuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OptionComponent],
      providers: [QuizService, StorageService],
    }).compileComponents();

    quizService = TestBed.inject(QuizService);
    fixture = TestBed.createComponent(OptionComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('Should display', () => {
    expect(component).toBeTruthy();
  });

  it('Should show expected options', () => {
    const expectedTitles = ['HTML', 'CSS', 'JavaScript', 'Accessibility'];
    const quizData = quizService.getQuizData();

    expect(quizData.map(quiz => quiz.title)).toEqual(expectedTitles);
  });

  it('Should select desired subject when clicked', () => {
    const spy = jest.spyOn(quizService, 'loadSubjectQuestions').mockImplementation((title) => {
      return data.quizzes.find((quiz) => quiz.title === title);
    });

    const button = fixture.debugElement.query(By.css('.option')).nativeElement;
    const title = button.textContent.trim();

    const expectedSubject = data.quizzes.find(quiz => quiz.title === title);

    button.click();

    expect(spy).toHaveBeenCalledWith(title);
    expect(spy).toHaveReturnedWith(expectedSubject);
  });
});
