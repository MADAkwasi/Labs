import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';
import { FilterComponent } from '../filter/filter.component';
import { Store } from '@ngrx/store';
import { selectAllInvoices } from '../../state/selectors/invoice.selector';

@Component({
  selector: 'app-headline',
  standalone: true,
  imports: [ButtonComponent, IconComponent, FilterComponent],
  templateUrl: './headline.component.html',
  styleUrl: './headline.component.css',
})
export class HeadlineComponent {
  private readonly store = inject(Store);
  invoices = this.store.selectSignal(selectAllInvoices);
}