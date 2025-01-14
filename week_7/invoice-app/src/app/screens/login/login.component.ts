import { Component, inject } from '@angular/core';
import { TextComponent } from '../../components/text/text.component';
import { TextFieldComponent } from '../../components/text-field/text-field.component';
import { ButtonComponent } from '../../components/button/button.component';
import { AuthService } from '../../auth/auth.service';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    TextComponent,
    TextFieldComponent,
    ButtonComponent,
    NgxSpinnerModule,
    AsyncPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly toastr = inject(ToastrService);
  private readonly router = inject(Router);
  private readonly spinner = inject(NgxSpinnerService);
  loginForm!: FormGroup;
  loading$!: Observable<boolean>;

  constructor() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

    this.loading$ = this.authService.loading$;
  }

  handleLogin() {
    if (this.loginForm.valid) {
      this.spinner.show();
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe({
        next: () => {
          this.toastr.success('Login successful');
          this.router.navigate(['/dashboard']);
          this.spinner.hide();
        },
        error: (error) => {
          this.toastr.error('Login failed', error.error);
          this.spinner.hide();
        },
      });
    }
  }
}
