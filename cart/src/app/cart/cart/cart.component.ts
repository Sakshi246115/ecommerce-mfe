import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  RevampFallbackService,
  CartContent
} from '../../services/revamp-fallback.service';

interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category?: string;
  quantity: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: CartItem[] = [];

  cartContent: CartContent = {
    cartBadge: '🛒 SHOPPING CART',
    cartTitle: 'My Cart',
    cartSubtitle: 'Review your selected products before checkout.',
    emptyCartTitle: 'Your cart is empty',
    emptyCartDescription: "You haven't added any products yet.",
    continueShopping: 'Continue Shopping',
    orderSummary: 'Order Summary',
    quantity: 'Quantity',
    itemTotal: 'Item Total',
    remove: '🗑 Remove',
    clearCart: '🗑 Clear Cart',
    checkout: 'Proceed to Checkout →'
  };

  readonly CART_KEY = 'ecommerce-cart';

  constructor(
    private router: Router,
    private revampFallbackService: RevampFallbackService
  ) {}

  ngOnInit(): void {
    this.loadCart();
    this.loadCartContent();
  }

  loadCart(): void {
    const savedCart = localStorage.getItem(this.CART_KEY);

    if (!savedCart) {
      this.cartItems = [];
      return;
    }

    try {
      const cart = JSON.parse(savedCart);

      this.cartItems = Array.isArray(cart)
        ? cart
        : [];

    } catch {
      this.cartItems = [];
    }
  }

  loadCartContent(): void {
    this.revampFallbackService.getCartContent().subscribe({
      next: (content: CartContent) => {
        this.cartContent = content;
      },
      error: (error) => {
        console.error('Cart content loading failed.', error);
      }
    });
  }

  increaseQuantity(item: CartItem): void {
    item.quantity += 1;
    this.saveCart();
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      this.removeItem(item);
      return;
    }

    this.saveCart();
  }

  removeItem(item: CartItem): void {
    this.cartItems = this.cartItems.filter(
      cartItem => cartItem.id !== item.id
    );

    this.saveCart();
  }

  clearCart(): void {
    this.cartItems = [];

    localStorage.removeItem(this.CART_KEY);

    this.dispatchCartUpdate();
  }

  getItemTotal(item: CartItem): number {
    return item.price * item.quantity;
  }

  get subtotal(): number {
    return this.cartItems.reduce(
      (total, item) =>
        total + (item.price * item.quantity),
      0
    );
  }

  get shipping(): number {
    return this.cartItems.length > 0
      ? 50
      : 0;
  }

  get total(): number {
    return this.subtotal + this.shipping;
  }

  get totalItems(): number {
    return this.cartItems.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );
  }

  checkout(): void {
    if (this.cartItems.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    this.router.navigate(['/cart/checkout']);
  }

  private saveCart(): void {
    localStorage.setItem(
      this.CART_KEY,
      JSON.stringify(this.cartItems)
    );

    this.dispatchCartUpdate();
  }

  private dispatchCartUpdate(): void {
    window.dispatchEvent(
      new CustomEvent('cart-updated')
    );
  }
}