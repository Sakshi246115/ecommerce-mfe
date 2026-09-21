import { Injectable } from '@angular/core';

export interface EcommerceUser {
  name: string;
  email: string;
  isLoggedIn: boolean;
}

export interface RegisteredUser {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly AUTH_KEY = 'ecommerce-user';
  private readonly USERS_KEY = 'ecommerce-users';

  private readonly DEFAULT_USER: RegisteredUser = {
    name: 'Admin',
    email: 'admin@gmail.com',
    password: 'admin123'
  };

  register(
    name: string,
    email: string,
    password: string
  ): {
    success: boolean;
    message: string;
  } {

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedName) {
      return {
        success: false,
        message: 'Please enter your name.'
      };
    }

    if (!trimmedEmail) {
      return {
        success: false,
        message: 'Please enter your email.'
      };
    }

    if (!password) {
      return {
        success: false,
        message: 'Please enter your password.'
      };
    }

    const users = this.getRegisteredUsers();

    const existingUser = users.find(
      user => user.email.toLowerCase() === trimmedEmail
    );

    if (existingUser) {
      return {
        success: false,
        message: 'An account with this email already exists.'
      };
    }

    const newUser: RegisteredUser = {
      name: trimmedName,
      email: trimmedEmail,
      password: password
    };

    users.push(newUser);

    localStorage.setItem(
      this.USERS_KEY,
      JSON.stringify(users)
    );

    return {
      success: true,
      message: 'Account created successfully.'
    };
  }

  login(email: string, password: string): {
    success: boolean;
    message: string;
  } {

    const trimmedEmail = email.trim().toLowerCase();

    const users = this.getRegisteredUsers();

    const user = users.find(
      registeredUser =>
        registeredUser.email.toLowerCase() === trimmedEmail &&
        registeredUser.password === password
    );

    if (!user) {
      return {
        success: false,
        message: 'Invalid username or password.'
      };
    }

    const loggedInUser: EcommerceUser = {
      name: user.name,
      email: user.email,
      isLoggedIn: true
    };

    localStorage.setItem(
      this.AUTH_KEY,
      JSON.stringify(loggedInUser)
    );

    return {
      success: true,
      message: 'Login successful.'
    };
  }

  logout(): void {
    localStorage.removeItem(this.AUTH_KEY);
  }

  isLoggedIn(): boolean {
    const user = localStorage.getItem(this.AUTH_KEY);

    if (!user) {
      return false;
    }

    try {
      const parsedUser = JSON.parse(user);

      return parsedUser.isLoggedIn === true;
    } catch {
      return false;
    }
  }

  getUser(): EcommerceUser | null {
    const user = localStorage.getItem(this.AUTH_KEY);

    if (!user) {
      return null;
    }

    try {
      return JSON.parse(user);
    } catch {
      return null;
    }
  }

  private getRegisteredUsers(): RegisteredUser[] {
    const savedUsers = localStorage.getItem(this.USERS_KEY);

    if (!savedUsers) {
      return [this.DEFAULT_USER];
    }

    try {
      const users = JSON.parse(savedUsers);

      if (!Array.isArray(users)) {
        return [this.DEFAULT_USER];
      }

      const hasDefaultUser = users.some(
        user =>
          user.email?.toLowerCase() ===
          this.DEFAULT_USER.email.toLowerCase()
      );

      if (!hasDefaultUser) {
        users.unshift(this.DEFAULT_USER);
      }

      return users;
    } catch {
      return [this.DEFAULT_USER];
    }
  }
}