import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {
  DEFAULT_ORDERS_LABELS
} from '../constants/orders.constant';

export interface OrdersContent {

  ordersBadge: string;
  ordersTitle: string;
  ordersSubtitle: string;

  emptyTitle: string;
  emptyDescription: string;

  orderId: string;
  orderDate: string;

  quantity: string;
  price: string;

  payment: string;
  delivery: string;
  totalAmount: string;

  deliveryAddress: string;

  clearHistory: string;

  cashOnDelivery: string;
  upi: string;
  card: string;
  netbanking: string;
  wallet: string;
  onlinePayment: string;

}

interface AemContentItem {

  key: string;
  title?: string;
  description?: string;
  device?: string;

}

interface AemScreen {

  screenIdentifier: string;
  screenContent: AemContentItem[];

}

interface AemResponse {

  screenCoverage: string;
  moduleIdentifier: string;
  lastModified: string;
  content: AemScreen[];

}

@Injectable({
  providedIn: 'root'
})
export class OrdersFallbackService {

  private readonly aemUrl =
    'http://localhost:4202/assets/aem/cart-content.json';

  constructor(
    private http: HttpClient
  ) {}

  getOrdersContent(): Observable<OrdersContent> {

    return this.http.get<AemResponse>(this.aemUrl).pipe(

      map((response: AemResponse) => {

        const ordersScreen =
          response?.content?.find(
            screen =>
              screen.screenIdentifier === 'orders'
          );

        const screenContent =
          ordersScreen?.screenContent || [];

        const getAemValue = (
          key: string,
          fallback: string
        ): string => {

          const content =
            screenContent.find(
              item => item.key === key
            );

          return content?.title || fallback;

        };

        return {

          ordersBadge: getAemValue(
            'orders-badge',
            DEFAULT_ORDERS_LABELS['orders-badge']['title']
          ),

          ordersTitle: getAemValue(
            'orders-title',
            DEFAULT_ORDERS_LABELS['orders-title']['title']
          ),

          ordersSubtitle: getAemValue(
            'orders-subtitle',
            DEFAULT_ORDERS_LABELS['orders-subtitle']['title']
          ),

          emptyTitle: getAemValue(
            'empty-title',
            DEFAULT_ORDERS_LABELS['empty-title']['title']
          ),

          emptyDescription: getAemValue(
            'empty-description',
            DEFAULT_ORDERS_LABELS['empty-description']['title']
          ),

          orderId: getAemValue(
            'order-id',
            DEFAULT_ORDERS_LABELS['order-id']['title']
          ),

          orderDate: getAemValue(
            'order-date',
            DEFAULT_ORDERS_LABELS['order-date']['title']
          ),

          quantity: getAemValue(
            'quantity',
            DEFAULT_ORDERS_LABELS['quantity']['title']
          ),

          price: getAemValue(
            'price',
            DEFAULT_ORDERS_LABELS['price']['title']
          ),

          payment: getAemValue(
            'payment',
            DEFAULT_ORDERS_LABELS['payment']['title']
          ),

          delivery: getAemValue(
            'delivery',
            DEFAULT_ORDERS_LABELS['delivery']['title']
          ),

          totalAmount: getAemValue(
            'total-amount',
            DEFAULT_ORDERS_LABELS['total-amount']['title']
          ),

          deliveryAddress: getAemValue(
            'delivery-address',
            DEFAULT_ORDERS_LABELS['delivery-address']['title']
          ),

          clearHistory: getAemValue(
            'clear-history',
            DEFAULT_ORDERS_LABELS['clear-history']['title']
          ),

          cashOnDelivery: getAemValue(
            'cash-on-delivery',
            DEFAULT_ORDERS_LABELS['cash-on-delivery']['title']
          ),

          upi: getAemValue(
            'upi',
            DEFAULT_ORDERS_LABELS['upi']['title']
          ),

          card: getAemValue(
            'card',
            DEFAULT_ORDERS_LABELS['card']['title']
          ),

          netbanking: getAemValue(
            'netbanking',
            DEFAULT_ORDERS_LABELS['netbanking']['title']
          ),

          wallet: getAemValue(
            'wallet',
            DEFAULT_ORDERS_LABELS['wallet']['title']
          ),

          onlinePayment: getAemValue(
            'online-payment',
            DEFAULT_ORDERS_LABELS['online-payment']['title']
          )

        };

      }),

      catchError((error) => {

        console.error(
          'Orders AEM content loading failed. Using fallback content.',
          error
        );

        return of({

          ordersBadge:
            DEFAULT_ORDERS_LABELS['orders-badge']['title'],

          ordersTitle:
            DEFAULT_ORDERS_LABELS['orders-title']['title'],

          ordersSubtitle:
            DEFAULT_ORDERS_LABELS['orders-subtitle']['title'],

          emptyTitle:
            DEFAULT_ORDERS_LABELS['empty-title']['title'],

          emptyDescription:
            DEFAULT_ORDERS_LABELS['empty-description']['title'],

          orderId:
            DEFAULT_ORDERS_LABELS['order-id']['title'],

          orderDate:
            DEFAULT_ORDERS_LABELS['order-date']['title'],

          quantity:
            DEFAULT_ORDERS_LABELS['quantity']['title'],

          price:
            DEFAULT_ORDERS_LABELS['price']['title'],

          payment:
            DEFAULT_ORDERS_LABELS['payment']['title'],

          delivery:
            DEFAULT_ORDERS_LABELS['delivery']['title'],

          totalAmount:
            DEFAULT_ORDERS_LABELS['total-amount']['title'],

          deliveryAddress:
            DEFAULT_ORDERS_LABELS['delivery-address']['title'],

          clearHistory:
            DEFAULT_ORDERS_LABELS['clear-history']['title'],

          cashOnDelivery:
            DEFAULT_ORDERS_LABELS['cash-on-delivery']['title'],

          upi:
            DEFAULT_ORDERS_LABELS['upi']['title'],

          card:
            DEFAULT_ORDERS_LABELS['card']['title'],

          netbanking:
            DEFAULT_ORDERS_LABELS['netbanking']['title'],

          wallet:
            DEFAULT_ORDERS_LABELS['wallet']['title'],

          onlinePayment:
            DEFAULT_ORDERS_LABELS['online-payment']['title']

        });

      })

    );

  }

}