import { Component, OnInit } from '@angular/core';
import { DescriptionComponent } from '../../description/description.component';
import { OptionComponent } from '../../option/option.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [DescriptionComponent, OptionComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {
  info = 'Welcome to the ';
  BoldenText = 'Frontend Quiz!';
}
