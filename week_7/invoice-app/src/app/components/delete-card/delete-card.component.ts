import { Component, inject, OnInit } from '@angular/core';
import { TextComponent } from '../text/text.component';
import { ButtonComponent } from '../button/button.component';
import { Store } from '@ngrx/store';
import { interactionsActions } from '../../state/actions/interactions.action';
import { invoiceActions } from '../../state/actions/invoice.action';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-card',
  imports: [TextComponent, ButtonComponent],
  templateUrl: './delete-card.component.html',
  styleUrl: './delete-card.component.css',
})
export class DeleteCardComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);
  invoiceId!: string;

  ngOnInit(): void {
    this.invoiceId = this.activatedRoute.snapshot.params['id'];
  }

  handleCancel(): void {
    this.store.dispatch(interactionsActions.cancelDelete());
  }

  handleDelete(): void {
    this.store.dispatch(
      invoiceActions.deleteInvoice({ invoiceId: this.invoiceId })
    );

    this.store.dispatch(interactionsActions.cancelDelete());

    this.router.navigate(['/dashboard']);
    this.toastr.success(`Invoice #${this.invoiceId} deleted successfully`);
  }
}
