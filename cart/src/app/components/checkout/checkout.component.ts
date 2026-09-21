import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  CheckoutFallbackService,
  CheckoutContent
} from '../../services/checkout-fallback.service';

interface CheckoutItem {
  id?: number;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  image?: string;
}

interface Order {
  orderId: string;
  orderDate: string;
  items: CheckoutItem[];
  subtotal: number;
  deliveryCharge: number;
  total: number;
  paymentMethod: string;
  onlinePaymentMethod?: string | null;

  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };

  status: string;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutItems: CheckoutItem[] = [];

  checkoutContent: CheckoutContent = {
    checkoutBadge: 'SECURE CHECKOUT',
    checkoutTitle: 'Complete Your Order',
    checkoutSubtitle:
      'Enter your delivery details and choose your preferred payment method.',
    secureCheckout: '🔒 Secure Checkout',
    orderSuccess: 'Order Placed Successfully!',
    customerInformation: 'Customer Information',
    deliveryAddress: 'Delivery Address',
    paymentMethod: 'Payment Method',
    cashOnDelivery: 'Cash on Delivery',
    onlinePayment: 'Online Payment',
    upi: 'UPI',
    card: 'Credit / Debit Card',
    netbanking: 'Net Banking',
    wallet: 'Wallet',
    orderSummary: 'Order Summary',
    subtotal: 'Subtotal',
    delivery: 'Delivery',
    free: 'FREE',
    total: 'Total',
    placeOrder: 'Place Order',
    continueShopping: 'Continue Shopping'
  };

  customer = {
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  };

  paymentMethod = 'cod';

  onlinePaymentMethod = 'upi';

  upiId = '';

  cardDetails = {
    cardNumber: '',
    cardHolderName: '',
    expiryDate: '',
    cvv: '',
    saveCard: false
  };

  selectedBank = '';

  walletDetails = {
    wallet: '',
    mobileNumber: ''
  };

  orderPlaced = false;

  private readonly CART_KEY = 'ecommerce-cart';
  private readonly ORDERS_KEY = 'ecommerce-orders';

  constructor(
    private router: Router,
    private checkoutFallbackService: CheckoutFallbackService
  ) {}

  ngOnInit(): void {
    this.loadCartItems();
    this.loadCheckoutContent();
  }

  /**
   * Load Checkout AEM content.
   * If AEM content is unavailable or a field is missing,
   * CheckoutFallbackService provides the constant fallback.
   */
  private loadCheckoutContent(): void {

    this.checkoutFallbackService
      .getCheckoutContent()
      .subscribe({
        next: (content: CheckoutContent) => {
          this.checkoutContent = content;
        },
        error: (error) => {
          console.error(
            'Checkout content loading failed.',
            error
          );
        }
      });
  }

  /**
   * Load the products actually selected by the user.
   */
  private loadCartItems(): void {

    const savedCart = localStorage.getItem(this.CART_KEY);

    if (!savedCart) {
      this.checkoutItems = [];
      return;
    }

    try {

      const cart = JSON.parse(savedCart);

      if (!Array.isArray(cart)) {
        this.checkoutItems = [];
        return;
      }

      this.checkoutItems = cart.map((item: any) => ({
        id: item.id,
        name: item.name,
        description: item.description || '',
        price: Number(item.price) || 0,
        quantity: Number(item.quantity) || 1,
        image: item.image || ''
      }));

    } catch {

      this.checkoutItems = [];

    }
  }

  get subtotal(): number {

    return this.checkoutItems.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    );

  }

  get deliveryCharge(): number {

    if (this.subtotal === 0) {
      return 0;
    }

    return this.subtotal >= 500 ? 0 : 50;
  }

  get total(): number {

    return this.subtotal + this.deliveryCharge;

  }

  placeOrder(): void {

    if (this.checkoutItems.length === 0) {

      alert(
        'Your cart is empty. Please add a product before placing an order.'
      );

      return;
    }

    if (
      !this.customer.name.trim() ||
      !this.customer.email.trim() ||
      !this.customer.phone.trim() ||
      !this.customer.address.trim() ||
      !this.customer.city.trim() ||
      !this.customer.state.trim() ||
      !this.customer.pincode.trim()
    ) {

      alert('Please fill all required details.');

      return;
    }

    if (this.paymentMethod === 'online') {

      if (this.onlinePaymentMethod === 'upi') {

        if (!this.upiId.trim()) {

          alert('Please enter your UPI ID.');

          return;
        }
      }

      if (this.onlinePaymentMethod === 'card') {

        if (
          !this.cardDetails.cardNumber.trim() ||
          !this.cardDetails.cardHolderName.trim() ||
          !this.cardDetails.expiryDate.trim() ||
          !this.cardDetails.cvv.trim()
        ) {

          alert('Please enter all card details.');

          return;
        }
      }

      if (this.onlinePaymentMethod === 'netbanking') {

        if (!this.selectedBank) {

          alert('Please select your bank.');

          return;
        }
      }

      if (this.onlinePaymentMethod === 'wallet') {

        if (
          !this.walletDetails.wallet ||
          !this.walletDetails.mobileNumber.trim()
        ) {

          alert('Please enter your wallet details.');

          return;
        }
      }
    }

    const newOrder: Order = {

      orderId: this.generateOrderId(),

      orderDate: new Date().toISOString(),

      /*
       * Save the ACTUAL products selected by the user.
       */
      items: this.checkoutItems.map(item => ({
        ...item
      })),

      subtotal: this.subtotal,

      deliveryCharge: this.deliveryCharge,

      total: this.total,

      paymentMethod: this.paymentMethod,

      onlinePaymentMethod:
        this.paymentMethod === 'online'
          ? this.onlinePaymentMethod
          : null,

      customer: {
        ...this.customer
      },

      status: 'Order Placed'
    };

    const existingOrders = this.getExistingOrders();

    existingOrders.unshift(newOrder);

    localStorage.setItem(
      this.ORDERS_KEY,
      JSON.stringify(existingOrders)
    );

    /*
     * Clear cart after successful order.
     */
    localStorage.removeItem(this.CART_KEY);

    /*
     * Update Cart count in Shell header.
     */
    window.dispatchEvent(
      new CustomEvent('cart-updated')
    );

    console.log(
      'Order placed successfully',
      newOrder
    );

    this.orderPlaced = true;
  }

  private getExistingOrders(): Order[] {

    const savedOrders =
      localStorage.getItem(this.ORDERS_KEY);

    if (!savedOrders) {
      return [];
    }

    try {

      const orders = JSON.parse(savedOrders);

      return Array.isArray(orders)
        ? orders
        : [];

    } catch {

      return [];
    }
  }

  private generateOrderId(): string {

    const timestamp =
      Date.now().toString().slice(-8);

    return 'ORD' + timestamp;
  }

  continueShopping(): void {

    this.router.navigate(['/products']);

  }
}