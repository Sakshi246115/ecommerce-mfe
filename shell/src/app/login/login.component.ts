import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

import {
  LoginFallbackService,
  LoginContent
} from '../services/login-fallback.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';
  errorMessage = '';
  emailError = '';
  passwordError = '';

  loginContent: LoginContent = {

    loginTitle: 'Login (const)',

    loginDescription:
      'Login to access your orders, exclusive offers, rewards and recommendations. (const)',

    loginFormTitle:
      'Login for the best experience (const)',

    loginFormSubtitle:
      'Enter your email and password to continue (const)',

    emailLabel:
      'Email (const)',

    emailPlaceholder:
      'Enter Email (const)',

    passwordLabel:
      'Password (const)',

    passwordPlaceholder:
      'Enter Password (const)',

    terms:
      'By continuing, you agree to our Terms of Use and Privacy Policy. (const)',

    termsOfUse:
      'Terms of Use (const)',

    privacyPolicy:
      'Privacy Policy (const)',

    continue:
      'Continue (const)',

    signupText:
      'New to My Ecommerce? (const)',

    createAccount:
      'Create an account (const)',

    emailRequired:
      'Please enter your email. (const)',

    passwordRequired:
      'Please enter your password. (const)',

    invalidEmail:
      'Please enter a valid email address. (const)'
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private loginFallbackService: LoginFallbackService
  ) {}

  ngOnInit(): void {
    this.loadLoginContent();
  }

  private loadLoginContent(): void {

    this.loginFallbackService
      .getLoginContent()
      .subscribe({

        next: (content: LoginContent) => {

          console.log(
            'LOGIN AEM CONTENT:',
            content
          );

          this.loginContent = content;
        },

        error: (error) => {

          console.error(
            'Login content loading failed.',
            error
          );
        }

      });
  }

  login(): void {

    this.errorMessage = '';
    this.emailError = '';
    this.passwordError = '';

    if (!this.email.trim()) {

      this.emailError =
        this.loginContent.emailRequired;
    }

    if (!this.password.trim()) {

      this.passwordError =
        this.loginContent.passwordRequired;
    }

    if (this.emailError || this.passwordError) {
      return;
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(this.email.trim())) {

      this.emailError =
        this.loginContent.invalidEmail;

      return;
    }

    const loginResult =
      this.authService.login(
        this.email.trim(),
        this.password
      );

    if (!loginResult.success) {

      this.errorMessage =
        loginResult.message;

      return;
    }

    this.router.navigate(['/']);
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

  goToRegister(): void {

    this.router.navigate(['/register']);
  }
}