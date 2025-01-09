// filepath: /c:/Users/MichaelAgyemanDarko/OneDrive - AmaliTech gGmbH/Documents/Labs/week_7/invoice-app/src/app/components/date-picker/date-picker.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePickerComponent } from './date-picker.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('DatePickerComponent', () => {
  let component: DatePickerComponent;
  let fixture: ComponentFixture<DatePickerComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatePickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatePickerComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the display date', () => {
    const displayDateElement = debugElement.query(
      By.css('.display-date app-text')
    ).nativeElement;
    expect(displayDateElement.textContent).toContain(component.displayDate);
  });

  it('should toggle calendar visibility when display date is clicked', () => {
    const displayDateElement = debugElement.query(
      By.css('.display-date')
    ).nativeElement;
    displayDateElement.click();
    fixture.detectChanges();
    expect(component.isCalendarVisible).toBeTruthy();
    displayDateElement.click();
    fixture.detectChanges();
    expect(component.isCalendarVisible).toBeFalsy();
  });
});
