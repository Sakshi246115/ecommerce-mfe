import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';

import {
  NavigationEnd,
  Router
} from '@angular/router';

import { AuthService } from '../../services/auth.service';

import {
  HeaderFallbackService,
  HeaderContent
} from '../../services/header-fallback.service';

import {
  filter
} from 'rxjs/operators';

import {
  Subscription
} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent
  implements OnInit, OnDestroy {

  userName: string = '';
  userEmail: string = '';

  isLoginPage: boolean = false;

  cartCount: number = 0;

  accountMenuOpen: boolean = false;

  headerContent: HeaderContent = {

    logo:
      'My Ecommerce (const)',

    home:
      'Home (const)',

    products:
      'Products (const)',

    cart:
      'Cart (const)',

    orders:
      'Orders (const)',

    welcome:
      'Welcome (const)',

    user:
      'User (const)',

    myProfile:
      'My Profile (const)',

    myOrders:
      'My Orders (const)',

    logout:
      'Logout (const)'
  };

  private cartUpdateHandler: () => void;

  private routerSubscription?: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private headerFallbackService: HeaderFallbackService
  ) {

    this.cartUpdateHandler = () => {
      this.updateCartCount();
    };

  }

  ngOnInit(): void {

    this.loadHeaderContent();

    this.checkLoginPage();

    this.routerSubscription =
      this.router.events
        .pipe(
          filter(
            event =>
              event instanceof NavigationEnd
          )
        )
        .subscribe(() => {

          this.checkLoginPage();

          this.loadUser();

          this.updateCartCount();

        });

    this.loadUser();

    this.updateCartCount();

    window.addEventListener(
      'cart-updated',
      this.cartUpdateHandler
    );
  }

  private loadHeaderContent(): void {

    this.headerFallbackService
      .getHeaderContent()
      .subscribe({

        next: (
          content: HeaderContent
        ) => {

          this.headerContent =
            content;

        },

        error: (error) => {

          console.error(
            'Header content loading failed.',
            error
          );

        }

      });

  }

  private checkLoginPage(): void {

    this.isLoginPage =
      this.router.url === '/login';

  }

  private loadUser(): void {

    const user =
      this.authService.getUser();

    if (user) {

      this.userName =
        user.name;

      this.userEmail =
        user.email;

    } else {

      this.userName =
        '';

      this.userEmail =
        '';

    }

  }

  private updateCartCount(): void {

    const savedCart =
      localStorage.getItem(
        'ecommerce-cart'
      );

    if (!savedCart) {

      this.cartCount = 0;

      return;
    }

    try {

      const cart =
        JSON.parse(savedCart);

      if (Array.isArray(cart)) {

        this.cartCount =
          cart.reduce(
            (
              total: number,
              item: any
            ) =>
              total +
              (item.quantity || 0),
            0
          );

      } else {

        this.cartCount = 0;

      }

    } catch {

      this.cartCount = 0;

    }

  }

  toggleAccountMenu(): void {

    this.accountMenuOpen =
      !this.accountMenuOpen;

  }

  logout(): void {

    this.authService.logout();

    this.router.navigate([
      '/login'
    ]);

  }

  ngOnDestroy(): void {

    window.removeEventListener(
      'cart-updated',
      this.cartUpdateHandler
    );

    this.routerSubscription
      ?.unsubscribe();

  }

}