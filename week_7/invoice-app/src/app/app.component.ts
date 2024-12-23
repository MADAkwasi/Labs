import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CommonModule, ViewportScroller } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectDeleteState } from './state/selectors/interactions.selector';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, CommonModule],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private readonly store = inject(Store);
  private readonly viewportScroller = inject(ViewportScroller);
  wantsToDelete = this.store.selectSignal(selectDeleteState);
  deleteState!: boolean;

  constructor() {
    effect(() => {
      this.deleteState = this.wantsToDelete();

      document.body.style.overflowY = this.deleteState ? 'hidden' : 'scroll';
      this.viewportScroller.scrollToPosition([0, 0]);
    });
  }
}
