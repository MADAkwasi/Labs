import { Component } from '@angular/core';
import { HeadingComponent } from "../../../components/heading/heading.component";
import { AddOnItemComponent } from "../../../components/add-on-item/add-on-item.component";
import { ButtonComponent } from "../../../components/button/button.component";

@Component({
  selector: 'app-add-ons-tab',
  standalone: true,
  imports: [HeadingComponent, AddOnItemComponent, ButtonComponent],
  templateUrl: './add-ons-tab.component.html',
  styleUrl: './add-ons-tab.component.css',
})
export class AddOnsTabComponent {
  heading = 'Pick add-ons';
  details = 'Add-ons enhance your gaming experience';
}
