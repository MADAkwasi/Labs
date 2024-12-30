import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
  Renderer2,
  signal,
  ViewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CommonModule, ViewportScroller } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  selectDeleteState,
  selectFormState,
} from './state/selectors/interactions.selector';
import { DialogComponent } from './components/dialog/dialog.component';
import { FormComponent } from './components/form/form.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    SidebarComponent,
    CommonModule,
    DialogComponent,
    FormComponent,
  ],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewChecked {
  private readonly store = inject(Store);
  private readonly viewportScroller = inject(ViewportScroller);
  private readonly renderer = inject(Renderer2);
  private readonly elementRef = inject(ElementRef);
  wantsToDelete = this.store.selectSignal(selectDeleteState);
  isFormActive = this.store.selectSignal(selectFormState);
  deleteState!: boolean;
  formHeight!: number;
  mainEL!: ElementRef;
  appFormEl!: FormComponent;

  constructor() {
    effect(() => {
      this.deleteState = this.wantsToDelete();

      document.body.style.overflowY = this.deleteState ? 'hidden' : 'scroll';
      this.viewportScroller.scrollToPosition([0, 0]);
    });

    effect(() => {
      if (this.isFormActive()) {
        const height = this.appFormEl;

        this.renderer.setStyle(
          this.renderer.selectRootElement('main', true),
          'height',
          height
        );
      } else {
        this.renderer.setStyle(
          this.renderer.selectRootElement('main', true),
          'height',
          'auto'
        );
      }
    });
  }

  ngAfterViewChecked(): void {
    // Dynamically access 'main' and 'app-form' elements
    this.mainEL = this.renderer.selectRootElement('main', true);
    this.appFormEl = this.renderer.selectRootElement('app-form', true);

    // Log the elements to check if they are available
    console.log('Main Element:', this.mainEL);
    console.log('App Form Element:', this.appFormEl);

    // Access the height of the app-form element if it exists
    if (this.appFormEl) {
      //   this.formHeight = this.appFormEl.nativeElement.clientHeight;
      //   console.log('Form Height:', this.formHeight);

      console.log(this.appFormEl);
    }
  }

  ngOnDestroy(): void {
    // Reset height when component is destroyed
    if (this.mainEL) {
      this.renderer.setStyle(this.mainEL.nativeElement, 'height', 'auto');
    }
  }
}
