import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: any[] = [];

  private cartSubject = new BehaviorSubject<any[]>([]);

  cartItems$ = this.cartSubject.asObservable();

  constructor() {
    const savedCart = localStorage.getItem('cart');

    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
      this.cartSubject.next([...this.cartItems]);
    }
  }

  private saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.cartSubject.next([...this.cartItems]);
  }

  addToCart(product: any): void {

    const existingProduct = this.cartItems.find(
      item => item.id === product.id
    );

    if (existingProduct) {

      existingProduct.quantity++;

    } else {

      this.cartItems.push({
        ...product,
        quantity: 1
      });

    }

    this.saveCart();
  }

  removeFromCart(productId: number): void {

    this.cartItems = this.cartItems.filter(
      item => item.id !== productId
    );

    this.saveCart();
  }

  increaseQuantity(productId: number): void {

    const product = this.cartItems.find(
      item => item.id === productId
    );

    if (product) {
      product.quantity++;
      this.saveCart();
    }
  }

  decreaseQuantity(productId: number): void {

    const product = this.cartItems.find(
      item => item.id === productId
    );

    if (product) {

      if (product.quantity > 1) {
        product.quantity--;
      } else {
        this.removeFromCart(productId);
        return;
      }

      this.saveCart();
    }
  }

  getCartItems(): any[] {
    return this.cartItems;
  }

  getCartCount(): number {

    return this.cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }

  getCartTotal(): number {

    return this.cartItems.reduce(
      (total, item) => total + (item.price * item.quantity),
      0
    );
  }
}