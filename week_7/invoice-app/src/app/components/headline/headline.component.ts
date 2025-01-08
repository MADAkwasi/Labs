import { Component, computed, inject } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';
import { FilterComponent } from '../filter/filter.component';
import { Store } from '@ngrx/store';
import { selectAllInvoices } from '../../state/selectors/invoice.selector';
import { TextComponent } from '../text/text.component';
import { interactionsActions } from '../../state/actions/interactions.action';
import { ResizeService } from '../../resize.service';

@Component({
  selector: 'app-headline',
  standalone: true,
  imports: [ButtonComponent, IconComponent, FilterComponent, TextComponent],
  templateUrl: './headline.component.html',
  styleUrl: './headline.component.css',
})
export class HeadlineComponent {
  private readonly store = inject(Store);
  private readonly resizeService = inject(ResizeService);
  invoices = this.store.selectSignal(selectAllInvoices);
  deviceWidth!: number;
  invoiceLength = computed(() => this.invoices().length);

  constructor() {
    this.resizeService.deviceWidth$.subscribe((width) => {
      this.deviceWidth = width;
    });
  }

  openForm() {
    this.store.dispatch(interactionsActions.openForm());
  }
}
