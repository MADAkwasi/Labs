import { Component } from '@angular/core';
import { HeadlineComponent } from "../../components/headline/headline.component";

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [HeadlineComponent],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.css'
})
export class InvoicesComponent {

}
