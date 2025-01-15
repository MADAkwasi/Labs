import { Component, ElementRef, inject, Renderer2 } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { invoiceActions } from '../../state/actions/invoice.action';
import { invoiceStatus } from '../../../assets/data/model';
import { selectFilteredInvoices } from '../../state/selectors/invoice.selector';
import { ResizeService } from '../../resize.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [IconComponent, CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent {
  private readonly store = inject(Store);
  private readonly resizeService = inject(ResizeService);
  private readonly renderer = inject(Renderer2);
  private readonly el = inject(ElementRef);
  isOpened!: boolean;
  deviceWidth!: number;
  statuses: invoiceStatus[] = ['draft', 'paid', 'pending'];
  selectedStatuses: Set<string> = new Set();
  invoices = this.store.selectSignal(selectFilteredInvoices);

  constructor() {
    this.resizeService.deviceWidth$.subscribe((width) => {
      this.deviceWidth = width;
    });

    this.renderer.listen('window', 'click', (e: Event) => {
      if (!this.el.nativeElement.contains(e.target)) {
        this.isOpened = false;
      }
    });
  }
  toggleDropdown() {
    this.isOpened = !this.isOpened;
  }

  onCheckboxChange(event: Event, status: invoiceStatus): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.handleCheckboxChange(status, isChecked);
  }

  handleCheckboxChange(status: string, checked: boolean): void {
    if (checked) {
      this.selectedStatuses.add(status);
    } else {
      this.selectedStatuses.delete(status);
    }

    this.store.dispatch(
      invoiceActions.updateFilters({
        statuses: Array.from(this.selectedStatuses),
      })
    );
  }
}
