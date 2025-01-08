import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { IconComponent } from '../../components/icon/icon.component';
import { TextComponent } from '../../components/text/text.component';
import { BadgeComponent } from '../../components/badge/badge.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAllInvoices } from '../../state/selectors/invoice.selector';
import { ButtonComponent } from '../../components/button/button.component';
import { invoiceActions } from '../../state/actions/invoice.action';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { DeleteCardComponent } from '../../components/delete-card/delete-card.component';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { selectDeleteState } from '../../state/selectors/interactions.selector';
import { interactionsActions } from '../../state/actions/interactions.action';
import { Invoice, invoiceStatus } from '../../../assets/data/model';
import { ResizeService } from '../../resize.service';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [
    IconComponent,
    TextComponent,
    BadgeComponent,
    ButtonComponent,
    DatePipe,
    CurrencyPipe,
    DeleteCardComponent,
    DialogComponent,
    CommonModule,
  ],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css',
})
export class InvoiceComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly resizeService = inject(ResizeService);
  invoices = this.store.selectSignal(selectAllInvoices);
  invoiceId = signal<string | null>(null);
  invoice = computed(
    () => this.invoices().find((inv) => inv.id === this.invoiceId()) as Invoice
  );
  shouldDelete = this.store.selectSignal(selectDeleteState);
  deviceWidth!: number;

  constructor() {
    this.resizeService.deviceWidth$.subscribe((width) => {
      this.deviceWidth = width;
    });
  }

  ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.params;
    this.store.dispatch(invoiceActions.setActiveInvoice({ invoiceId: id }));
    this.invoiceId.set(id);

    if (!this.invoices() || this.invoices().length === 0) {
      this.store.dispatch(invoiceActions.loadInvoices());
    }
  }

  handleNaviagteBack(): void {
    this.router.navigate(['/dashboard']);
  }

  handleEditInvoice(): void {
    this.store.dispatch(interactionsActions.editForm());
  }

  onClickDeleteBtn(): void {
    this.store.dispatch(interactionsActions.handleDelete());
  }

  onChangeStatus(status: invoiceStatus | undefined): void {
    this.store.dispatch(
      invoiceActions.updateInvoiceStatus({
        invoiceId: this.invoiceId() as string,
        status: 'paid',
      })
    );
  }
}
