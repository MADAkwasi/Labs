import { Component, inject, OnInit } from '@angular/core';
import { HeadingComponent } from '../../../components/heading/heading.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { OverviewCardComponent } from '../../../components/overview-card/overview-card.component';
import { WrappedUpCardComponent } from '../../../components/wrapped-up-card/wrapped-up-card.component';
import { StorageService } from '../../../storage.service';

@Component({
  selector: 'app-summary-tab',
  standalone: true,
  imports: [
    HeadingComponent,
    ButtonComponent,
    OverviewCardComponent,
    WrappedUpCardComponent,
  ],
  templateUrl: './summary-tab.component.html',
  styleUrl: './summary-tab.component.css',
})
export class SummaryTabComponent implements OnInit {
  private readonly storageService = inject(StorageService);
  heading = 'Finishing up';
  details = 'Double-check everything looks OK before confirming';
  isSubmitted!: boolean;
  isFormValid!: boolean;

  ngOnInit(): void {
    const personalFormIsValid = this.storageService.getData<boolean>(
      'personalInfoIsValid'
    );
    const planIsValid = this.storageService.getData<boolean>('planIsValid');

    if (personalFormIsValid && planIsValid)
      this.isFormValid = personalFormIsValid && planIsValid;
  }

  handleSubmit(isSubmitted: boolean): void {
    this.isSubmitted = isSubmitted;
  }
}
