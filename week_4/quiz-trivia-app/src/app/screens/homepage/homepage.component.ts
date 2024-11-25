import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { DescriptionComponent } from './description/description.component';
import { OptionComponent } from '../../option/option.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [HeaderComponent, DescriptionComponent, OptionComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {}
