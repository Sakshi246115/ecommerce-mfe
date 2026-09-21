import { Component, OnInit } from '@angular/core';

import {
  OrdersFallbackService,
  OrdersContent
} from '../services/orders-fallback.service';


interface OrderItem {
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
  items: OrderItem[];
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
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Order[] = [];

  private readonly ORDERS_KEY = 'ecommerce-orders';


  ordersContent: OrdersContent = {

    ordersBadge: 'MY ACCOUNT (const)',

    ordersTitle: 'My Orders (const)',

    ordersSubtitle:
      'View your recent orders and order details. (const)',

    emptyTitle:
      'No Orders Yet (const)',

    emptyDescription:
      "You haven't placed any orders yet. (const)",

    orderId:
      'ORDER ID (const)',

    orderDate:
      'ORDER DATE (const)',

    quantity:
      'Quantity (const)',

    price:
      'Price (const)',

    payment:
      'Payment (const)',

    delivery:
      'Delivery (const)',

    totalAmount:
      'Total Amount (const)',

    deliveryAddress:
      '📍 Delivery Address (const)',

    clearHistory:
      'Clear Order History (const)',

    cashOnDelivery:
      'Cash on Delivery (const)',

    upi:
      'UPI (const)',

    card:
      'Credit / Debit Card (const)',

    netbanking:
      'Net Banking (const)',

    wallet:
      'Wallet (const)',

    onlinePayment:
      'Online Payment (const)'

  };


  constructor(
    private ordersFallbackService: OrdersFallbackService
  ) {}


  ngOnInit(): void {

    this.loadOrders();

    this.loadOrdersContent();

  }


  loadOrders(): void {

    const savedOrders =
      localStorage.getItem(this.ORDERS_KEY);


    if (!savedOrders) {

      this.orders = [];

      return;

    }


    try {

      const orders = JSON.parse(savedOrders);

      this.orders = Array.isArray(orders)
        ? orders
        : [];

    } catch {

      this.orders = [];

    }

  }


  private loadOrdersContent(): void {

    this.ordersFallbackService
      .getOrdersContent()
      .subscribe({

        next: (content: OrdersContent) => {

          this.ordersContent = content;

        },

        error: (error) => {

          console.error(
            'Orders content loading failed.',
            error
          );

        }

      });

  }


  getPaymentMethod(order: Order): string {

    if (order.paymentMethod === 'cod') {

      return this.ordersContent.cashOnDelivery;

    }


    if (order.onlinePaymentMethod === 'upi') {

      return this.ordersContent.upi;

    }


    if (order.onlinePaymentMethod === 'card') {

      return this.ordersContent.card;

    }


    if (order.onlinePaymentMethod === 'netbanking') {

      return this.ordersContent.netbanking;

    }


    if (order.onlinePaymentMethod === 'wallet') {

      return this.ordersContent.wallet;

    }


    return this.ordersContent.onlinePayment;

  }


  clearOrderHistory(): void {

    const confirmed = confirm(
      'Are you sure you want to clear your order history?'
    );


    if (!confirmed) {

      return;

    }


    localStorage.removeItem(this.ORDERS_KEY);

    this.orders = [];

  }

}