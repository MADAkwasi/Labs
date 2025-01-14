import { Component } from '@angular/core';
import { TextComponent } from '../../components/text/text.component';
import { TextFieldComponent } from '../../components/text-field/text-field.component';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [TextComponent, TextFieldComponent, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {}
