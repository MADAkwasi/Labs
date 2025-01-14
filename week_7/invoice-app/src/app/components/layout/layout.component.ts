import { Component, effect, inject, Renderer2 } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { DialogComponent } from '../dialog/dialog.component';
import { FormComponent } from '../form/form.component';
import { Store } from '@ngrx/store';
import { ViewportScroller } from '@angular/common';
import {
  selectDeleteState,
  selectFormState,
} from '../../state/selectors/interactions.selector';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SidebarComponent, DialogComponent, FormComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  private readonly store = inject(Store);
  private readonly viewportScroller = inject(ViewportScroller);
  private readonly renderer = inject(Renderer2);
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
