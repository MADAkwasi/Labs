import {
  Component,
  ElementRef,
  forwardRef,
  inject,
  Renderer2,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';
import { TextComponent } from '../text/text.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [IconComponent, TextComponent, CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    },
  ],
})
export class DropdownComponent implements ControlValueAccessor {
  private readonly renderer = inject(Renderer2);
  private readonly el = inject(ElementRef);
  isOpened = false;
  paymentTerms = 1;

  constructor() {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (!this.el.nativeElement.contains(e.target)) {
        this.isOpened = false;
      }
    });
  }

  toggleDropdown() {
    this.isOpened = !this.isOpened;
  }

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.paymentTerms = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onSelectionChange(value: number): void {
    this.paymentTerms = value;
    this.onChange(value);
    this.onTouched();
    this.isOpened = false;
  }
}
