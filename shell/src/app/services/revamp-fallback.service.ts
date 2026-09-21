import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
  map,
  catchError,
  of
} from 'rxjs';

import {
  DEFAULT_HOME_LABELS
} from '../constants/home.constant';

export interface HomeScreenContent {

  // Hero section
  badge: string;
  title: string;
  heading: string;
  headingHighlight: string;
  description: string;

  // Categories section
  categoriesBadge: string;
  categoriesTitle: string;
  categoriesDescription: string;

  // Electronics
  electronicsTitle: string;
  electronicsDescription: string;
  electronicsButton: string;

  // Fashion
  fashionTitle: string;
  fashionDescription: string;
  fashionButton: string;

  // Home category
  homeCategoryTitle: string;
  homeCategoryDescription: string;
  homeCategoryButton: string;

  // Features
  fastDeliveryTitle: string;
  fastDeliveryDescription: string;

  securePaymentTitle: string;
  securePaymentDescription: string;

  qualityProductsTitle: string;
  qualityProductsDescription: string;
}

interface AemContentItem {
  key: string;
  title?: string;
  subdescription?: string;
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
    'http://localhost:4200/assets/aem/home-content.json';

  constructor(
    private http: HttpClient
  ) {}

  getHomeContent(): Observable<HomeScreenContent> {

    return this.http
      .get<AemResponse>(this.aemUrl)
      .pipe(

        map((response: AemResponse) => {

          const homeScreen =
            response?.content?.find(
              screen =>
                screen.screenIdentifier === 'home'
            );

          const screenContent =
            homeScreen?.screenContent || [];

          const getAemValue = (
            key: string,
            fallback: string,
            field: 'title' | 'subdescription' | 'description' = 'title'
          ): string => {

            const content =
              screenContent.find(
                item =>
                  item.key === key
              );

            return content?.[field] || fallback;
          };

          return {

            // Hero section

            badge:
              getAemValue(
                'welcome-badge',
                DEFAULT_HOME_LABELS['welcome-badge']['badge']
              ),

            title:
              getAemValue(
                'heading',
                DEFAULT_HOME_LABELS['heading']['title']
              ),

            heading:
              getAemValue(
                'heading',
                DEFAULT_HOME_LABELS['heading']['heading']
              ),

            headingHighlight:
              getAemValue(
                'heading',
                DEFAULT_HOME_LABELS['heading']['subdescription'],
                'subdescription'
              ),

            description:
              getAemValue(
                'heading',
                DEFAULT_HOME_LABELS['heading']['description'],
                'description'
              ),

            // Categories section

            categoriesBadge:
              getAemValue(
                'categories',
                DEFAULT_HOME_LABELS['categories']['badge']
              ),

            categoriesTitle:
              getAemValue(
                'categories',
                DEFAULT_HOME_LABELS['categories']['title']
              ),

            categoriesDescription:
              getAemValue(
                'categories',
                DEFAULT_HOME_LABELS['categories']['description'],
                'description'
              ),

            // Electronics

            electronicsTitle:
              getAemValue(
                'electronics',
                DEFAULT_HOME_LABELS['electronics']['title']
              ),

            electronicsDescription:
              getAemValue(
                'electronics',
                DEFAULT_HOME_LABELS['electronics']['description'],
                'description'
              ),

            electronicsButton:
              getAemValue(
                'electronics',
                DEFAULT_HOME_LABELS['electronics']['button']
              ),

            // Fashion

            fashionTitle:
              getAemValue(
                'fashion',
                DEFAULT_HOME_LABELS['fashion']['title']
              ),

            fashionDescription:
              getAemValue(
                'fashion',
                DEFAULT_HOME_LABELS['fashion']['description'],
                'description'
              ),

            fashionButton:
              getAemValue(
                'fashion',
                DEFAULT_HOME_LABELS['fashion']['button']
              ),

            // Home category

            homeCategoryTitle:
              getAemValue(
                'home-category',
                DEFAULT_HOME_LABELS['home-category']['title']
              ),

            homeCategoryDescription:
              getAemValue(
                'home-category',
                DEFAULT_HOME_LABELS['home-category']['description'],
                'description'
              ),

            homeCategoryButton:
              getAemValue(
                'home-category',
                DEFAULT_HOME_LABELS['home-category']['button']
              ),

            // Features

            fastDeliveryTitle:
              getAemValue(
                'fast-delivery',
                DEFAULT_HOME_LABELS['features']['fast-delivery']
              ),

            fastDeliveryDescription:
              getAemValue(
                'fast-delivery-description',
                DEFAULT_HOME_LABELS['features']['fast-delivery-description'],
                'description'
              ),

            securePaymentTitle:
              getAemValue(
                'secure-payment',
                DEFAULT_HOME_LABELS['features']['secure-payment']
              ),

            securePaymentDescription:
              getAemValue(
                'secure-payment-description',
                DEFAULT_HOME_LABELS['features']['secure-payment-description'],
                'description'
              ),

            qualityProductsTitle:
              getAemValue(
                'quality-products',
                DEFAULT_HOME_LABELS['features']['quality-products']
              ),

            qualityProductsDescription:
              getAemValue(
                'quality-products-description',
                DEFAULT_HOME_LABELS['features']['quality-products-description'],
                'description'
              )

          };

        }),

        catchError((error) => {

          console.error(
            'Home AEM content loading failed. Using fallback content.',
            error
          );

          return of({

            // Hero section

            badge:
              DEFAULT_HOME_LABELS['welcome-badge']['badge'],

            title:
              DEFAULT_HOME_LABELS['heading']['title'],

            heading:
              DEFAULT_HOME_LABELS['heading']['heading'],

            headingHighlight:
              DEFAULT_HOME_LABELS['heading']['subdescription'],

            description:
              DEFAULT_HOME_LABELS['heading']['description'],

            // Categories section

            categoriesBadge:
              DEFAULT_HOME_LABELS['categories']['badge'],

            categoriesTitle:
              DEFAULT_HOME_LABELS['categories']['title'],

            categoriesDescription:
              DEFAULT_HOME_LABELS['categories']['description'],

            // Electronics

            electronicsTitle:
              DEFAULT_HOME_LABELS['electronics']['title'],

            electronicsDescription:
              DEFAULT_HOME_LABELS['electronics']['description'],

            electronicsButton:
              DEFAULT_HOME_LABELS['electronics']['button'],

            // Fashion

            fashionTitle:
              DEFAULT_HOME_LABELS['fashion']['title'],

            fashionDescription:
              DEFAULT_HOME_LABELS['fashion']['description'],

            fashionButton:
              DEFAULT_HOME_LABELS['fashion']['button'],

            // Home category

            homeCategoryTitle:
              DEFAULT_HOME_LABELS['home-category']['title'],

            homeCategoryDescription:
              DEFAULT_HOME_LABELS['home-category']['description'],

            homeCategoryButton:
              DEFAULT_HOME_LABELS['home-category']['button'],

            // Features

            fastDeliveryTitle:
              DEFAULT_HOME_LABELS['features']['fast-delivery'],

            fastDeliveryDescription:
              DEFAULT_HOME_LABELS['features']['fast-delivery-description'],

            securePaymentTitle:
              DEFAULT_HOME_LABELS['features']['secure-payment'],

            securePaymentDescription:
              DEFAULT_HOME_LABELS['features']['secure-payment-description'],

            qualityProductsTitle:
              DEFAULT_HOME_LABELS['features']['quality-products'],

            qualityProductsDescription:
              DEFAULT_HOME_LABELS['features']['quality-products-description']

          });

        })

      );

  }

}