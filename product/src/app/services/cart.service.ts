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

  private cartSubject =
    new BehaviorSubject<CartItem[]>(this.loadCart());

  cart$: Observable<CartItem[]> =
    this.cartSubject.asObservable();


  // =========================
  // GET CART
  // =========================

  getCart(): CartItem[] {
    return this.cartSubject.value;
  }


  // =========================
  // ADD PRODUCT
  // =========================

  addToCart(product: Omit<CartItem, 'quantity'>): void {

    const currentCart = [...this.cartSubject.value];

    const existingProduct = currentCart.find(
      item => item.id === product.id
    );

    if (existingProduct) {

      existingProduct.quantity++;

    } else {

      currentCart.push({
        ...product,
        quantity: 1
      });

    }

    this.updateCart(currentCart);
  }


  // =========================
  // INCREASE QUANTITY
  // =========================

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


  // =========================
  // DECREASE QUANTITY
  // =========================

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


  // =========================
  // REMOVE PRODUCT
  // =========================

  removeFromCart(productId: number): void {

    const updatedCart =
      this.cartSubject.value.filter(
        item => item.id !== productId
      );

    this.updateCart(updatedCart);
  }


  // =========================
  // CLEAR CART
  // =========================

  clearCart(): void {

    this.updateCart([]);
  }


  // =========================
  // TOTAL ITEMS
  // =========================

  getTotalItems(): number {

    return this.cartSubject.value.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );
  }


  // =========================
  // SUBTOTAL
  // =========================

  getSubtotal(): number {

    return this.cartSubject.value.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    );
  }


  // =========================
  // SHIPPING
  // =========================

  getShipping(): number {

    return this.getSubtotal() > 0
      ? 50
      : 0;
  }


  // =========================
  // GRAND TOTAL
  // =========================

  getTotal(): number {

    return (
      this.getSubtotal() +
      this.getShipping()
    );
  }


  // =========================
  // UPDATE CART
  // =========================

  private updateCart(cart: CartItem[]): void {

    localStorage.setItem(
      this.CART_KEY,
      JSON.stringify(cart)
    );

    this.cartSubject.next(cart);

    window.dispatchEvent(
      new CustomEvent('cart-updated', {
        detail: cart
      })
    );
  }


  // =========================
  // LOAD CART
  // =========================

  private loadCart(): CartItem[] {

    const savedCart =
      localStorage.getItem(this.CART_KEY);

    if (!savedCart) {
      return [];
    }

    try {

      return JSON.parse(savedCart);

    } catch {

      return [];
    }
  }

}