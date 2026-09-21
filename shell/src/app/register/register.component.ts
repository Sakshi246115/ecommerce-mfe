import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  name = '';
  email = '';
  password = '';
  confirmPassword = '';

  nameError = '';
  emailError = '';
  passwordError = '';
  confirmPasswordError = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register(): void {
    this.clearErrors();

    if (!this.name.trim()) {
      this.nameError = 'Please enter your name.';
    }

    if (!this.email.trim()) {
      this.emailError = 'Please enter your email.';
    }

    if (!this.password.trim()) {
      this.passwordError = 'Please enter your password.';
    }

    if (!this.confirmPassword.trim()) {
      this.confirmPasswordError = 'Please confirm your password.';
    }

    if (
      this.nameError ||
      this.emailError ||
      this.passwordError ||
      this.confirmPasswordError
    ) {
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(this.email.trim())) {
      this.emailError = 'Please enter a valid email address.';
      return;
    }

    if (this.password.length < 6) {
      this.passwordError =
        'Password must be at least 6 characters.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.confirmPasswordError =
        'Passwords do not match.';
      return;
    }

    const result = this.authService.register(
      this.name,
      this.email,
      this.password
    );

    if (!result.success) {
      this.errorMessage = result.message;
      return;
    }

    alert('Account created successfully. Please login.');

    this.router.navigate(['/login']);
  }

  clearErrors(): void {
    this.nameError = '';
    this.emailError = '';
    this.passwordError = '';
    this.confirmPasswordError = '';
    this.errorMessage = '';
  }

  onNameChange(): void {
    if (this.name.trim()) {
      this.nameError = '';
    }
    this.errorMessage = '';
  }

  onEmailChange(): void {
    if (this.email.trim()) {
      this.emailError = '';
    }
    this.errorMessage = '';
  }

  onPasswordChange(): void {
    if (this.password.trim()) {
      this.passwordError = '';
    }
    this.errorMessage = '';
  }

  onConfirmPasswordChange(): void {
    if (this.confirmPassword.trim()) {
      this.confirmPasswordError = '';
    }
    this.errorMessage = '';
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}