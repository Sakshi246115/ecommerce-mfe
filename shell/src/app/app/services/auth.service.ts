import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly AUTH_KEY = 'ecommerce-user';

  login(email: string, password: string): void {
    const user = {
      email: email,
      isLoggedIn: true
    };

    localStorage.setItem(
      this.AUTH_KEY,
      JSON.stringify(user)
    );
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

  getUser(): {
    email: string;
    isLoggedIn: boolean;
  } | null {

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
}