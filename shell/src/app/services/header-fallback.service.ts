import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
  of,
  map,
  catchError
} from 'rxjs';

import {
  DEFAULT_HEADER_LABELS
} from '../constants/header.constant';

export interface HeaderContent {
  logo: string;
  home: string;
  products: string;
  cart: string;
  orders: string;
  welcome: string;
  user: string;
  myProfile: string;
  myOrders: string;
  logout: string;
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
export class HeaderFallbackService {

  private readonly aemUrl =
    'http://localhost:4200/assets/aem/header-content.json';

  constructor(
    private http: HttpClient
  ) {}

  getHeaderContent(): Observable<HeaderContent> {

    return this.http
      .get<AemResponse>(this.aemUrl)
      .pipe(

        map((response: AemResponse) => {

          const headerScreen =
            response?.content?.find(
              screen =>
                screen.screenIdentifier === 'header'
            );

          const screenContent =
            headerScreen?.screenContent || [];

          const getAemValue = (
            key: string,
            fallback: string
          ): string => {

            const content =
              screenContent.find(
                item =>
                  item.key === key
              );

            return content?.title || fallback;
          };

          return {

            logo:
              getAemValue(
                'logo',
                DEFAULT_HEADER_LABELS['logo']['title']
              ),

            home:
              getAemValue(
                'home',
                DEFAULT_HEADER_LABELS['home']['title']
              ),

            products:
              getAemValue(
                'products',
                DEFAULT_HEADER_LABELS['products']['title']
              ),

            cart:
              getAemValue(
                'cart',
                DEFAULT_HEADER_LABELS['cart']['title']
              ),

            orders:
              getAemValue(
                'orders',
                DEFAULT_HEADER_LABELS['orders']['title']
              ),

            welcome:
              getAemValue(
                'welcome',
                DEFAULT_HEADER_LABELS['welcome']['title']
              ),

            user:
              getAemValue(
                'user',
                DEFAULT_HEADER_LABELS['user']['title']
              ),

            myProfile:
              getAemValue(
                'my-profile',
                DEFAULT_HEADER_LABELS['my-profile']['title']
              ),

            myOrders:
              getAemValue(
                'my-orders',
                DEFAULT_HEADER_LABELS['my-orders']['title']
              ),

            logout:
              getAemValue(
                'logout',
                DEFAULT_HEADER_LABELS['logout']['title']
              )

          };

        }),

        catchError((error) => {

          console.error(
            'Header AEM content loading failed. Using fallback content.',
            error
          );

          return of({

            logo:
              DEFAULT_HEADER_LABELS['logo']['title'],

            home:
              DEFAULT_HEADER_LABELS['home']['title'],

            products:
              DEFAULT_HEADER_LABELS['products']['title'],

            cart:
              DEFAULT_HEADER_LABELS['cart']['title'],

            orders:
              DEFAULT_HEADER_LABELS['orders']['title'],

            welcome:
              DEFAULT_HEADER_LABELS['welcome']['title'],

            user:
              DEFAULT_HEADER_LABELS['user']['title'],

            myProfile:
              DEFAULT_HEADER_LABELS['my-profile']['title'],

            myOrders:
              DEFAULT_HEADER_LABELS['my-orders']['title'],

            logout:
              DEFAULT_HEADER_LABELS['logout']['title']

          });

        })

      );
  }
}