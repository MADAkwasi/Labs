import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { TextComponent } from '../text/text.component';

@Component({
  selector: 'app-date-picker',
  imports: [CommonModule, IconComponent, TextComponent],
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
})
export class DatePickerComponent {
  @Output() dateChange = new EventEmitter<Date | null>();
  @Input() selectedDate!: Date;
  today = new Date();
  isCalendarVisible = false;
  currentMonth: number = this.today.getMonth();
  currentYear: number = this.today.getFullYear();

  daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  calendar: CalendarDate[][] = [];

  onDateSelected(date: Date | null) {
    this.dateChange.emit(date);
  }

  get currentMonthYear(): string {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      year: 'numeric',
    }).format(new Date(this.currentYear, this.currentMonth));
  }

  get displayDate(): string {
    const date = this.selectedDate || this.today;
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  }

  constructor() {
    this.generateCalendar();
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

    for (let i = 0; i < firstDayOfMonth; i++) {
      dates.push({ date: null, inCurrentMonth: false });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      dates.push({
        date: new Date(this.currentYear, this.currentMonth, day),
        inCurrentMonth: true,
      });
    }

    let nextMonthDay = 1;
    while (dates.length % 7 !== 0) {
      dates.push({
        date: new Date(this.currentYear, this.currentMonth + 1, nextMonthDay++),
        inCurrentMonth: false,
      });
    }

    this.calendar = [];
    for (let i = 0; i < dates.length; i += 7) {
      this.calendar.push(dates.slice(i, i + 7));
    }
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

  selectDate(date: Date | null): void {
    if (date) {
      this.selectedDate = date;
      this.isCalendarVisible = false;
    }
  }

  isSelected(date: Date | null): boolean {
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
  date: Date | null;
  inCurrentMonth: boolean;
}