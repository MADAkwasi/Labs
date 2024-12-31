import { HeaderComponent } from './header.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuizService } from '../data/quiz.service';
import { StorageService } from '../storage.service';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [QuizService, StorageService],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('renders correctly', () => {
    expect(component).toBeTruthy();
  });

  it('switches between light and dark mode', () => {
    const toggleBtn = fixture.debugElement.query(By.css('input')).nativeElement;
    const body = document.body;

    toggleBtn.click();
    expect(body.classList).toContain('dark-mode');

    toggleBtn.click();
    expect(body.classList).toContain('light-mode');
  });
});
