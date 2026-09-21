import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {
  DEFAULT_CART_LABELS,
  CmsLabelMap
} from '../constants/cart.constant';

export interface CartContent {
  cartBadge: string;
  cartTitle: string;
  cartSubtitle: string;
  emptyCartTitle: string;
  emptyCartDescription: string;
  continueShopping: string;
  orderSummary: string;
  quantity: string;
  itemTotal: string;
  remove: string;
  clearCart: string;
  checkout: string;
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
export class RevampFallbackService {

  private readonly aemUrl =
    'http://localhost:4202/assets/aem/cart-content.json';

  constructor(
    private http: HttpClient
  ) {}

  getCartContent(): Observable<CartContent> {

    return this.http
      .get<AemResponse>(this.aemUrl)
      .pipe(

        map(response => {

          const cartScreen =
            response?.content?.find(
              screen =>
                screen.screenIdentifier === 'cart'
            );

          const screenContent =
            cartScreen?.screenContent || [];

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

            cartBadge:
              getAemValue(
                'cart-badge',
                DEFAULT_CART_LABELS['cart-badge']['text']
              ),

            cartTitle:
              getAemValue(
                'cart-title',
                DEFAULT_CART_LABELS['cart-title']['title']
              ),

            cartSubtitle:
              getAemValue(
                'cart-subtitle',
                DEFAULT_CART_LABELS['cart-subtitle']['text']
              ),

            emptyCartTitle:
              getAemValue(
                'empty-title',
                DEFAULT_CART_LABELS['empty-cart']['title']
              ),

            emptyCartDescription:
              getAemValue(
                'empty-description',
                DEFAULT_CART_LABELS['empty-cart']['description']
              ),

            continueShopping:
              getAemValue(
                'continue-shopping',
                DEFAULT_CART_LABELS['empty-cart']['button']
              ),

            orderSummary:
              getAemValue(
                'order-summary',
                DEFAULT_CART_LABELS['order-summary']['title']
              ),

            quantity:
              getAemValue(
                'quantity',
                DEFAULT_CART_LABELS['quantity']['label']
              ),

            itemTotal:
              getAemValue(
                'item-total',
                DEFAULT_CART_LABELS['item-total']['label']
              ),

            remove:
              getAemValue(
                'remove',
                DEFAULT_CART_LABELS['item-total']['remove']
              ),

            clearCart:
              getAemValue(
                'clear-cart',
                DEFAULT_CART_LABELS['clear-cart']['text']
              ),

            checkout:
              getAemValue(
                'checkout',
                DEFAULT_CART_LABELS['order-summary']['checkout']
              )
          };
        }),

        catchError(error => {

          console.error(
            'Cart AEM content loading failed. Using fallback content.',
            error
          );

          return of({

            cartBadge:
              DEFAULT_CART_LABELS['cart-badge']['text'],

            cartTitle:
              DEFAULT_CART_LABELS['cart-title']['title'],

            cartSubtitle:
              DEFAULT_CART_LABELS['cart-subtitle']['text'],

            emptyCartTitle:
              DEFAULT_CART_LABELS['empty-cart']['title'],

            emptyCartDescription:
              DEFAULT_CART_LABELS['empty-cart']['description'],

            continueShopping:
              DEFAULT_CART_LABELS['empty-cart']['button'],

            orderSummary:
              DEFAULT_CART_LABELS['order-summary']['title'],

            quantity:
              DEFAULT_CART_LABELS['quantity']['label'],

            itemTotal:
              DEFAULT_CART_LABELS['item-total']['label'],

            remove:
              DEFAULT_CART_LABELS['item-total']['remove'],

            clearCart:
              DEFAULT_CART_LABELS['clear-cart']['text'],

            checkout:
              DEFAULT_CART_LABELS['order-summary']['checkout']
          });
        })
      );
  }
}