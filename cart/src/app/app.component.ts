import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
  implements OnInit, OnDestroy {

  title = 'cart';

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {

    window.addEventListener(
      'navigate-to-cart',
      this.navigateToCart
    );
  }

  ngOnDestroy(): void {

    window.removeEventListener(
      'navigate-to-cart',
      this.navigateToCart
    );
  }

  private navigateToCart = (): void => {

    this.router.navigate(['/cart']);

  };

}