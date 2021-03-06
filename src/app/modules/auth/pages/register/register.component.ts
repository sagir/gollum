import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegistrationRequest } from './../../models/RegistrationRequest';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.createRegistrationForm();
  }

  private createRegistrationForm(): void {
    this.form = this.fb.group({
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ],
      ],
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(16),
        ],
      ],
      password_confirmation: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(16),
          (control: AbstractControl): ValidationErrors | null => {
            if (
              control.parent &&
              control.parent.get('password')?.value !== control.value
            ) {
              return { confirmation: control.value };
            }

            return null;
          },
        ],
      ],
    });
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.snackBar.open('Invalid data.', 'Close', { duration: 3000 });
      return;
    }

    this.spinner.show('global');
    const res = await this.authService.register(this.form.value as RegistrationRequest);
    this.spinner.hide('global');

    if (res) {
      this.snackBar.open('Registration successfull.', 'Close', { duration: 3000 });
      this.router.navigateByUrl('/');
    } else {
      this.snackBar.open('Registration failed.', 'Close', { duration: 3000 });
    }
  }
}
