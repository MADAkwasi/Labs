import { Routes } from '@angular/router';
import { HomepageComponent } from './screens/homepage/homepage.component';
import { SignupPageComponent } from './screens/signup-page/signup-page.component';
import { PageNotFoundComponent } from './screens/page-not-found/page-not-found.component';
import { PersonalInfoTabComponent } from './screens/signup-page/personal-info-tab/personal-info-tab.component';
import { PlanTabComponent } from './screens/signup-page/plan-tab/plan-tab.component';
import { AddOnsTabComponent } from './screens/signup-page/add-ons-tab/add-ons-tab.component';
import { SummaryTabComponent } from './screens/signup-page/summary-tab/summary-tab.component';

export const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'signup',
    component: SignupPageComponent,
    children: [
      {
        path: 'personal-info',
        component: PersonalInfoTabComponent,
      },
      { path: 'plan', component: PlanTabComponent },
      { path: 'add-ons', component: AddOnsTabComponent },
      { path: 'summary', component: SummaryTabComponent },
      { path: '', redirectTo: 'personal-info', pathMatch: 'full' },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
