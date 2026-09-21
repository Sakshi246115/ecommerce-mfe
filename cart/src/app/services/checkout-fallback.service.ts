import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {
  DEFAULT_CHECKOUT_LABELS,
  CmsLabelMap
} from '../constants/checkout.constant';

export interface CheckoutContent {
  checkoutBadge: string;
  checkoutTitle: string;
  checkoutSubtitle: string;
  secureCheckout: string;
  orderSuccess: string;
  customerInformation: string;
  deliveryAddress: string;
  paymentMethod: string;
  cashOnDelivery: string;
  onlinePayment: string;
  upi: string;
  card: string;
  netbanking: string;
  wallet: string;
  orderSummary: string;
  subtotal: string;
  delivery: string;
  free: string;
  total: string;
  placeOrder: string;
  continueShopping: string;
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
export class CheckoutFallbackService {

  private readonly aemUrl =
    'http://localhost:4202/assets/aem/cart-content.json';

  constructor(
    private http: HttpClient
  ) {}

  getCheckoutContent(): Observable<CheckoutContent> {

    return this.http.get<AemResponse>(this.aemUrl).pipe(

      map((response: AemResponse) => {

        const checkoutScreen =
          response?.content?.find(
            screen =>
              screen.screenIdentifier === 'checkout'
          );

        const screenContent =
          checkoutScreen?.screenContent || [];

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

          checkoutBadge: getAemValue(
            'checkout-badge',
            DEFAULT_CHECKOUT_LABELS['checkout-badge']['title']
          ),

          checkoutTitle: getAemValue(
            'checkout-title',
            DEFAULT_CHECKOUT_LABELS['checkout-title']['title']
          ),

          checkoutSubtitle: getAemValue(
            'checkout-subtitle',
            DEFAULT_CHECKOUT_LABELS['checkout-subtitle']['title']
          ),

          secureCheckout: getAemValue(
            'secure-checkout',
            DEFAULT_CHECKOUT_LABELS['secure-checkout']['title']
          ),

          orderSuccess: getAemValue(
            'order-success',
            DEFAULT_CHECKOUT_LABELS['order-success']['title']
          ),

          customerInformation: getAemValue(
            'customer-information',
            DEFAULT_CHECKOUT_LABELS['customer-information']['title']
          ),

          deliveryAddress: getAemValue(
            'delivery-address',
            DEFAULT_CHECKOUT_LABELS['delivery-address']['title']
          ),

          paymentMethod: getAemValue(
            'payment-method',
            DEFAULT_CHECKOUT_LABELS['payment-method']['title']
          ),

          cashOnDelivery: getAemValue(
            'cash-on-delivery',
            DEFAULT_CHECKOUT_LABELS['cash-on-delivery']['title']
          ),

          onlinePayment: getAemValue(
            'online-payment',
            DEFAULT_CHECKOUT_LABELS['online-payment']['title']
          ),

          upi: getAemValue(
            'upi',
            DEFAULT_CHECKOUT_LABELS['upi']['title']
          ),

          card: getAemValue(
            'card',
            DEFAULT_CHECKOUT_LABELS['card']['title']
          ),

          netbanking: getAemValue(
            'netbanking',
            DEFAULT_CHECKOUT_LABELS['netbanking']['title']
          ),

          wallet: getAemValue(
            'wallet',
            DEFAULT_CHECKOUT_LABELS['wallet']['title']
          ),

          orderSummary: getAemValue(
            'order-summary',
            DEFAULT_CHECKOUT_LABELS['order-summary']['title']
          ),

          subtotal: getAemValue(
            'subtotal',
            DEFAULT_CHECKOUT_LABELS['subtotal']['title']
          ),

          delivery: getAemValue(
            'delivery',
            DEFAULT_CHECKOUT_LABELS['delivery']['title']
          ),

          free: getAemValue(
            'free',
            DEFAULT_CHECKOUT_LABELS['free']['title']
          ),

          total: getAemValue(
            'total',
            DEFAULT_CHECKOUT_LABELS['total']['title']
          ),

          placeOrder: getAemValue(
            'place-order',
            DEFAULT_CHECKOUT_LABELS['place-order']['title']
          ),

          continueShopping: getAemValue(
            'continue-shopping',
            DEFAULT_CHECKOUT_LABELS['continue-shopping']['title']
          )

        };

      }),

      catchError((error) => {

        console.error(
          'Checkout AEM content loading failed. Using fallback content.',
          error
        );

        return of({

          checkoutBadge:
            DEFAULT_CHECKOUT_LABELS['checkout-badge']['title'],

          checkoutTitle:
            DEFAULT_CHECKOUT_LABELS['checkout-title']['title'],

          checkoutSubtitle:
            DEFAULT_CHECKOUT_LABELS['checkout-subtitle']['title'],

          secureCheckout:
            DEFAULT_CHECKOUT_LABELS['secure-checkout']['title'],

          orderSuccess:
            DEFAULT_CHECKOUT_LABELS['order-success']['title'],

          customerInformation:
            DEFAULT_CHECKOUT_LABELS['customer-information']['title'],

          deliveryAddress:
            DEFAULT_CHECKOUT_LABELS['delivery-address']['title'],

          paymentMethod:
            DEFAULT_CHECKOUT_LABELS['payment-method']['title'],

          cashOnDelivery:
            DEFAULT_CHECKOUT_LABELS['cash-on-delivery']['title'],

          onlinePayment:
            DEFAULT_CHECKOUT_LABELS['online-payment']['title'],

          upi:
            DEFAULT_CHECKOUT_LABELS['upi']['title'],

          card:
            DEFAULT_CHECKOUT_LABELS['card']['title'],

          netbanking:
            DEFAULT_CHECKOUT_LABELS['netbanking']['title'],

          wallet:
            DEFAULT_CHECKOUT_LABELS['wallet']['title'],

          orderSummary:
            DEFAULT_CHECKOUT_LABELS['order-summary']['title'],

          subtotal:
            DEFAULT_CHECKOUT_LABELS['subtotal']['title'],

          delivery:
            DEFAULT_CHECKOUT_LABELS['delivery']['title'],

          free:
            DEFAULT_CHECKOUT_LABELS['free']['title'],

          total:
            DEFAULT_CHECKOUT_LABELS['total']['title'],

          placeOrder:
            DEFAULT_CHECKOUT_LABELS['place-order']['title'],

          continueShopping:
            DEFAULT_CHECKOUT_LABELS['continue-shopping']['title']

        });

      })

    );
  }
}