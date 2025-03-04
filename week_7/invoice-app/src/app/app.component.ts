import { Component, effect, inject, Renderer2 } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import {  ViewportScroller } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  selectDeleteState,
  selectFormState,
} from './state/selectors/interactions.selector';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
  ],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private readonly store = inject(Store);
  private readonly viewportScroller = inject(ViewportScroller);
  private readonly renderer = inject(Renderer2);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly authService = inject(AuthService);
  shouldDelete = this.store.selectSignal(selectDeleteState);
  isFormActive = this.store.selectSignal(selectFormState);

  constructor() {
    effect(() => {
      const deleteState = this.shouldDelete();
      const formState = this.isFormActive();

      if (deleteState || formState) {
        this.renderer.setStyle(document.body, 'overflow', 'hidden');
      } else {
        this.renderer.setStyle(document.body, 'overflow', 'auto');
      }

      if (deleteState || formState) {
        this.viewportScroller.scrollToPosition([0, 0]);
      }
    });
  }
}
