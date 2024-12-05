import { Component } from '@angular/core';
import { HeadingComponent } from "../../../components/heading/heading.component";

@Component({
  selector: 'app-add-ons-tab',
  standalone: true,
  imports: [HeadingComponent],
  templateUrl: './add-ons-tab.component.html',
  styleUrl: './add-ons-tab.component.css',
})
export class AddOnsTabComponent {
  heading = 'Pick add-ons';
  details = 'Add-ons enhance your gaming experience';
}
