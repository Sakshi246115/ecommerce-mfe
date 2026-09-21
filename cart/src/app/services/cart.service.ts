import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly CART_KEY = 'ecommerce-cart';
  private readonly CART_EVENT = 'cart-updated';

  private cartSubject =
    new BehaviorSubject<CartItem[]>(this.loadCart());

  cart$: Observable<CartItem[]> =
    this.cartSubject.asObservable();

  getCart(): CartItem[] {
    return this.cartSubject.value;
  }

  addToCart(product: Omit<CartItem, 'quantity'>): void {

    const currentCart = this.cartSubject.value;

    const existingItem = currentCart.find(
      item => item.id === product.id
    );

    let updatedCart: CartItem[];

    if (existingItem) {

      updatedCart = currentCart.map(item => {

        if (item.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + 1
          };
        }

        return item;
      });

    } else {

      updatedCart = [
        ...currentCart,
        {
          ...product,
          quantity: 1
        }
      ];

    }

    this.updateCart(updatedCart);
  }

  increaseQuantity(productId: number): void {

    const updatedCart =
      this.cartSubject.value.map(item => {

        if (item.id === productId) {
          return {
            ...item,
            quantity: item.quantity + 1
          };
        }

        return item;

      });

    this.updateCart(updatedCart);
  }

  decreaseQuantity(productId: number): void {

    const updatedCart =
      this.cartSubject.value
        .map(item => {

          if (item.id === productId) {
            return {
              ...item,
              quantity: item.quantity - 1
            };
          }

          return item;

        })
        .filter(item => item.quantity > 0);

    this.updateCart(updatedCart);
  }

  removeFromCart(productId: number): void {

    const updatedCart =
      this.cartSubject.value.filter(
        item => item.id !== productId
      );

    this.updateCart(updatedCart);
  }

  clearCart(): void {
    this.updateCart([]);
  }

  getTotalItems(): number {

    return this.cartSubject.value.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );
  }

  getSubtotal(): number {

    return this.cartSubject.value.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    );
  }

  getShipping(): number {

    return this.getSubtotal() > 0
      ? 50
      : 0;
  }

  getTotal(): number {

    return (
      this.getSubtotal() +
      this.getShipping()
    );
  }

  refreshFromStorage(): void {

    const cart = this.loadCart();

    this.cartSubject.next(cart);
  }

  private updateCart(cart: CartItem[]): void {

    localStorage.setItem(
      this.CART_KEY,
      JSON.stringify(cart)
    );

    this.cartSubject.next(cart);

    window.dispatchEvent(
      new CustomEvent(this.CART_EVENT, {
        detail: cart
      })
    );
  }

  private loadCart(): CartItem[] {

    const savedCart =
      localStorage.getItem(this.CART_KEY);

    if (!savedCart) {
      return [];
    }

    try {

      const cart = JSON.parse(savedCart);

      if (!Array.isArray(cart)) {
        return [];
      }

      return cart;

    } catch {

      return [];
    }
  }
}