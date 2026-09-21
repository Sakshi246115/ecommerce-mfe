export interface CmsSection {

  [key: string]: any;

}

export interface CmsLabelMap {

  [section: string]: CmsSection;

}

export const DEFAULT_LOGIN_LABELS: CmsLabelMap = {

  'login-title': {
    title: 'Login (const)'
  },

  'login-description': {
    title:
      'Login to access your orders, exclusive offers, rewards and recommendations. (const)'
  },

  'login-form-title': {
    title: 'Login for the best experience (const)'
  },

  'login-form-subtitle': {
    title:
      'Enter your email and password to continue (const)'
  },

  'email-label': {
    title: 'Email (const)'
  },

  'email-placeholder': {
    title: 'Enter Email (const)'
  },

  'password-label': {
    title: 'Password (const)'
  },

  'password-placeholder': {
    title: 'Enter Password (const)'
  },

  'terms': {
    title:
      'By continuing, you agree to our Terms of Use and Privacy Policy. (const)'
  },

  'terms-of-use': {
    title: 'Terms of Use (const)'
  },

  'privacy-policy': {
    title: 'Privacy Policy (const)'
  },

  'continue': {
    title: 'Continue (const)'
  },

  'signup-text': {
    title: 'New to My Ecommerce? (const)'
  },

  'create-account': {
    title: 'Create an account (const)'
  },

  'email-required': {
    title: 'Please enter your email. (const)'
  },

  'password-required': {
    title: 'Please enter your password. (const)'
  },

  'invalid-email': {
    title: 'Please enter a valid email address. (const)'
  }

};