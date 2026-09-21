import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'shell';
  isLoggedIn = false;
  cartCount = 0;

  private routerSub?: Subscription;

  private readonly CART_KEY = 'ecommerce-cart';
  private readonly CART_EVENT = 'cart-updated';
  private readonly NAVIGATE_CART_EVENT = 'navigate-to-cart';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // Tumcha existing showHeader getter (No changes needed)
  get showHeader(): boolean {
    return (
      this.isLoggedIn &&
      !this.router.url.includes('/login')
    );
  }

  ngOnInit(): void {
    // Initial check
    this.checkAuthStatus();

    // Listen to route changes so showHeader updates automatically on /login
    this.routerSub = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkAuthStatus();
    });

    this.updateCartCount();

    // Listen for cart changes
    window.addEventListener(
      this.CART_EVENT,
      this.updateCartCount
    );

    // Listen for Product → Cart navigation
    window.addEventListener(
      this.NAVIGATE_CART_EVENT,
      this.navigateToCart
    );
  }

  ngOnDestroy(): void {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }

    window.removeEventListener(
      this.CART_EVENT,
      this.updateCartCount
    );

    window.removeEventListener(
      this.NAVIGATE_CART_EVENT,
      this.navigateToCart
    );
  }

  private checkAuthStatus(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  private updateCartCount = (): void => {
    const savedCart = localStorage.getItem(this.CART_KEY);

    if (!savedCart) {
      this.cartCount = 0;
      return;
    }

    try {
      const cart = JSON.parse(savedCart);
      this.cartCount = Array.isArray(cart)
        ? cart.reduce(
            (total: number, item: any) => total + item.quantity,
            0
          )
        : 0;
    } catch {
      this.cartCount = 0;
    }
  };

  private navigateToCart = (): void => {
    this.router.navigate(['/cart']);
  };
}