import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { TextComponent } from '../text/text.component';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [CommonModule, IconComponent, TextComponent],
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
})
export class DatePickerComponent {
  private readonly renderer = inject(Renderer2);
  private readonly el = inject(ElementRef);
  @Output() dateChange = new EventEmitter<Date>();
  @Input() selectedDate!: Date;
  today = new Date();
  isCalendarVisible = false;
  currentMonth: number = this.today.getMonth();
  currentYear: number = this.today.getFullYear();

  daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  calendar: CalendarDate[][] = [];

  onDateSelected(date: Date) {
    this.dateChange.emit(date);
  }

  get currentMonthYear(): string {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      year: 'numeric',
    }).format(new Date(this.currentYear, this.currentMonth));
  }

  get displayDate(): string {
    const date = this.selectedDate;
    return new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
  }

  constructor() {
    this.generateCalendar();

    this.renderer.listen('window', 'click', (e: Event) => {
      if (!this.el.nativeElement.contains(e.target)) {
        this.isCalendarVisible = false;
      }
    });
  }

  toggleCalendar(): void {
    this.isCalendarVisible = !this.isCalendarVisible;
  }

  generateCalendar(): void {
    const daysInMonth = new Date(
      this.currentYear,
      this.currentMonth + 1,
      0
    ).getDate();
    const firstDayOfMonth = new Date(
      this.currentYear,
      this.currentMonth,
      1
    ).getDay();

    const dates: CalendarDate[] = [];
    const placeholderDate = new Date(0);

    Array.from({ length: firstDayOfMonth }).forEach(() => {
      dates.push({ date: placeholderDate, inCurrentMonth: false });
    });

    Array.from({ length: daysInMonth }).forEach((_, index) => {
      dates.push({
        date: new Date(this.currentYear, this.currentMonth, index + 1),
        inCurrentMonth: true,
      });
    });

    let nextMonthDay = 1;
    while (dates.length % 7 !== 0) {
      dates.push({
        date: new Date(this.currentYear, this.currentMonth + 1, nextMonthDay++),
        inCurrentMonth: false,
      });
    }

    this.calendar = [];
    Array.from({ length: Math.ceil(dates.length / 7) }).forEach((_, index) => {
      this.calendar.push(dates.slice(index * 7, index * 7 + 7));
    });
  }

  changeMonth(offset: number): void {
    this.currentMonth += offset;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.generateCalendar();
  }

  selectDate(date: Date): void {
    this.selectedDate = date;
    this.isCalendarVisible = false;
  }

  isSelected(date: Date): boolean {
    return (
      !!date &&
      !!this.selectedDate &&
      date.getDate() === this.selectedDate.getDate() &&
      date.getMonth() === this.selectedDate.getMonth() &&
      date.getFullYear() === this.selectedDate.getFullYear()
    );
  }
}

interface CalendarDate {
  date: Date;
  inCurrentMonth: boolean;
}
