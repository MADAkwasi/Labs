// filepath: /c:/Users/MichaelAgyemanDarko/OneDrive - AmaliTech gGmbH/Documents/labs/week_7/invoice-app/src/app/services/resize.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResizeService {
  private readonly deviceWidthSubject = new BehaviorSubject<number>(
    window.innerWidth
  );
  deviceWidth$ = this.deviceWidthSubject.asObservable();

  constructor() {
    window.addEventListener('resize', this.onResize.bind(this));
  }

  private onResize(event: Event): void {
    this.deviceWidthSubject.next(window.innerWidth);
  }
}
