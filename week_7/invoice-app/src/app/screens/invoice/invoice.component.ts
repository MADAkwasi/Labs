import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { IconComponent } from '../../components/icon/icon.component';
import { TextComponent } from '../../components/text/text.component';
import { BadgeComponent } from '../../components/badge/badge.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAllInvoices } from '../../state/selectors/invoice.selector';
import { ButtonComponent } from '../../components/button/button.component';
import { invoiceActions } from '../../state/actions/invoice.action';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Address } from '../../../assets/data/model';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [
    IconComponent,
    TextComponent,
    BadgeComponent,
    ButtonComponent,
    DatePipe,
    CurrencyPipe
  ],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css',
})
export class InvoiceComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  store = inject(Store);
  router = inject(Router);
  invoices = this.store.selectSignal(selectAllInvoices);
  idSignal = signal<string | null>(null);
  invoice = computed(() =>
    this.invoices().find((inv) => inv.id === this.idSignal())
  );

  ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.params;
    this.idSignal.set(id);

    if (!this.invoices() || this.invoices().length === 0) {
      this.store.dispatch(invoiceActions.loadInvoices());
    }
  }

  handleNaviagteBack() {
    this.router.navigate(['/dashboard']);
  }
}
