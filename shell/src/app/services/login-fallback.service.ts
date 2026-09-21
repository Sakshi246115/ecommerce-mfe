import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {
  DEFAULT_LOGIN_LABELS
} from '../constants/login.constant';

export interface LoginContent {

  loginTitle: string;

  loginDescription: string;

  loginFormTitle: string;

  loginFormSubtitle: string;

  emailLabel: string;

  emailPlaceholder: string;

  passwordLabel: string;

  passwordPlaceholder: string;

  terms: string;

  termsOfUse: string;

  privacyPolicy: string;

  continue: string;

  signupText: string;

  createAccount: string;

  emailRequired: string;

  passwordRequired: string;

  invalidEmail: string;

}


interface AemContentItem {

  key: string;

  title?: string;

  description?: string;

  device?: string;

}


interface AemScreen {

  screenIdentifier: string;

  screenContent: AemContentItem[];

}


interface AemResponse {

  screenCoverage: string;

  moduleIdentifier: string;

  lastModified: string;

  content: AemScreen[];

}


@Injectable({
  providedIn: 'root'
})
export class LoginFallbackService {

  private readonly aemUrl =
    'http://localhost:4200/assets/aem/login-content.json';


  constructor(
    private http: HttpClient
  ) {}


  getLoginContent(): Observable<LoginContent> {

    return this.http.get<AemResponse>(this.aemUrl).pipe(

      map((response: AemResponse) => {

        const loginScreen =
          response?.content?.find(
            screen =>
              screen.screenIdentifier === 'login'
          );


        const screenContent =
          loginScreen?.screenContent || [];


        const getAemValue = (
          key: string,
          fallback: string
        ): string => {

          const content =
            screenContent.find(
              item => item.key === key
            );

          return content?.title || fallback;

        };


        return {

          loginTitle: getAemValue(
            'login-title',
            DEFAULT_LOGIN_LABELS['login-title']['title']
          ),

          loginDescription: getAemValue(
            'login-description',
            DEFAULT_LOGIN_LABELS['login-description']['title']
          ),

          loginFormTitle: getAemValue(
            'login-form-title',
            DEFAULT_LOGIN_LABELS['login-form-title']['title']
          ),

          loginFormSubtitle: getAemValue(
            'login-form-subtitle',
            DEFAULT_LOGIN_LABELS['login-form-subtitle']['title']
          ),

          emailLabel: getAemValue(
            'email-label',
            DEFAULT_LOGIN_LABELS['email-label']['title']
          ),

          emailPlaceholder: getAemValue(
            'email-placeholder',
            DEFAULT_LOGIN_LABELS['email-placeholder']['title']
          ),

          passwordLabel: getAemValue(
            'password-label',
            DEFAULT_LOGIN_LABELS['password-label']['title']
          ),

          passwordPlaceholder: getAemValue(
            'password-placeholder',
            DEFAULT_LOGIN_LABELS['password-placeholder']['title']
          ),

          terms: getAemValue(
            'terms',
            DEFAULT_LOGIN_LABELS['terms']['title']
          ),

          termsOfUse: getAemValue(
            'terms-of-use',
            DEFAULT_LOGIN_LABELS['terms-of-use']['title']
          ),

          privacyPolicy: getAemValue(
            'privacy-policy',
            DEFAULT_LOGIN_LABELS['privacy-policy']['title']
          ),

          continue: getAemValue(
            'continue',
            DEFAULT_LOGIN_LABELS['continue']['title']
          ),

          signupText: getAemValue(
            'signup-text',
            DEFAULT_LOGIN_LABELS['signup-text']['title']
          ),

          createAccount: getAemValue(
            'create-account',
            DEFAULT_LOGIN_LABELS['create-account']['title']
          ),

          emailRequired: getAemValue(
            'email-required',
            DEFAULT_LOGIN_LABELS['email-required']['title']
          ),

          passwordRequired: getAemValue(
            'password-required',
            DEFAULT_LOGIN_LABELS['password-required']['title']
          ),

          invalidEmail: getAemValue(
            'invalid-email',
            DEFAULT_LOGIN_LABELS['invalid-email']['title']
          )

        };

      }),

      catchError((error) => {

        console.error(
          'Login AEM content loading failed. Using fallback content.',
          error
        );


        return of({

          loginTitle:
            DEFAULT_LOGIN_LABELS['login-title']['title'],

          loginDescription:
            DEFAULT_LOGIN_LABELS['login-description']['title'],

          loginFormTitle:
            DEFAULT_LOGIN_LABELS['login-form-title']['title'],

          loginFormSubtitle:
            DEFAULT_LOGIN_LABELS['login-form-subtitle']['title'],

          emailLabel:
            DEFAULT_LOGIN_LABELS['email-label']['title'],

          emailPlaceholder:
            DEFAULT_LOGIN_LABELS['email-placeholder']['title'],

          passwordLabel:
            DEFAULT_LOGIN_LABELS['password-label']['title'],

          passwordPlaceholder:
            DEFAULT_LOGIN_LABELS['password-placeholder']['title'],

          terms:
            DEFAULT_LOGIN_LABELS['terms']['title'],

          termsOfUse:
            DEFAULT_LOGIN_LABELS['terms-of-use']['title'],

          privacyPolicy:
            DEFAULT_LOGIN_LABELS['privacy-policy']['title'],

          continue:
            DEFAULT_LOGIN_LABELS['continue']['title'],

          signupText:
            DEFAULT_LOGIN_LABELS['signup-text']['title'],

          createAccount:
            DEFAULT_LOGIN_LABELS['create-account']['title'],

          emailRequired:
            DEFAULT_LOGIN_LABELS['email-required']['title'],

          passwordRequired:
            DEFAULT_LOGIN_LABELS['password-required']['title'],

          invalidEmail:
            DEFAULT_LOGIN_LABELS['invalid-email']['title']

        });

      })

    );

  }

}