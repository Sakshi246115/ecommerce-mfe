import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  Observable,
  map,
  catchError,
  of
} from 'rxjs';

import {
  DEFAULT_PRODUCT_LABELS
} from '../constants/product-content.constants';


// =====================================================
// PRODUCT LIST CONTENT
// =====================================================

export interface ProductScreenContent {
  heading: string;
  description: string;
  searchPlaceholder: string;
  emptyTitle: string;
  emptyDescription: string;
}


// =====================================================
// PRODUCT DETAILS CONTENT
// =====================================================

export interface ProductDetailsContent {
  backButton: string;
  addToCartButton: string;
  notFoundTitle: string;
  notFoundDescription: string;
}


// =====================================================
// AEM CONTENT MODELS
// =====================================================

interface AemContentItem {
  key: string;
  title?: string;
  description?: string;
  subdescription?: string;
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


// =====================================================
// PRODUCT CONTENT SERVICE
// =====================================================

@Injectable({
  providedIn: 'root'
})
export class ProductContentService {

  private readonly aemUrl =
  'http://localhost:4201/assets/aem/product-content.json';

  constructor(
    private http: HttpClient
  ) {}


  // ===================================================
  // PRODUCT LIST CONTENT
  // ===================================================

  getProductContent():
    Observable<ProductScreenContent> {

    return this.http
      .get<AemResponse>(this.aemUrl)

      .pipe(

        map(response => {

          const productsScreen =
            response?.content?.find(
              screen =>
                screen.screenIdentifier === 'products'
            );

          const screenContent =
            productsScreen?.screenContent || [];


          // AEM sections

          const headingContent =
            screenContent.find(
              item =>
                item.key === 'heading'
            );

          const searchContent =
            screenContent.find(
              item =>
                item.key === 'search'
            );

          const emptyContent =
            screenContent.find(
              item =>
                item.key === 'empty-state'
            );


          // Constant fallback sections

          const defaultHeading =
            DEFAULT_PRODUCT_LABELS['heading'];

          const defaultSearch =
            DEFAULT_PRODUCT_LABELS['search'];

          const defaultEmpty =
            DEFAULT_PRODUCT_LABELS['empty-state'];


          // AEM → Constant fallback

          return {

            heading:
              headingContent?.title ||
              defaultHeading['title'],

            description:
              headingContent?.description ||
              defaultHeading['description'],

            searchPlaceholder:
              searchContent?.title ||
              defaultSearch['title'],

            emptyTitle:
              emptyContent?.title ||
              defaultEmpty['title'],

            emptyDescription:
              emptyContent?.description ||
              defaultEmpty['description']
          };

        }),


        // =================================================
        // AEM ERROR → CONSTANT FALLBACK
        // =================================================

        catchError(error => {

          console.error(
            'Product AEM content loading failed. Using fallback content.',
            error
          );


          const defaultHeading =
            DEFAULT_PRODUCT_LABELS['heading'];

          const defaultSearch =
            DEFAULT_PRODUCT_LABELS['search'];

          const defaultEmpty =
            DEFAULT_PRODUCT_LABELS['empty-state'];


          return of({

            heading:
              defaultHeading['title'],

            description:
              defaultHeading['description'],

            searchPlaceholder:
              defaultSearch['title'],

            emptyTitle:
              defaultEmpty['title'],

            emptyDescription:
              defaultEmpty['description']
          });

        })
      );
  }


  // ===================================================
  // PRODUCT DETAILS CONTENT
  // ===================================================

  getProductDetailsContent():
    Observable<ProductDetailsContent> {

    return this.http
      .get<AemResponse>(this.aemUrl)

      .pipe(

        map(response => {

          const detailsScreen =
            response?.content?.find(
              screen =>
                screen.screenIdentifier ===
                'product-details'
            );

          const screenContent =
            detailsScreen?.screenContent || [];


          const backButtonContent =
            screenContent.find(
              item =>
                item.key === 'back-button'
            );

          const addToCartContent =
            screenContent.find(
              item =>
                item.key === 'add-to-cart'
            );

          const notFoundContent =
            screenContent.find(
              item =>
                item.key === 'not-found'
            );


          // Constant fallback

          const defaultBackButton =
            '← Back to Products';

          const defaultAddToCartButton =
            '🛒 Add to Cart';

          const defaultNotFoundTitle =
            'Product Not Found';

          const defaultNotFoundDescription =
            'The product you are looking for is not available.';


          return {

            backButton:
              backButtonContent?.title ||
              defaultBackButton,

            addToCartButton:
              addToCartContent?.title ||
              defaultAddToCartButton,

            notFoundTitle:
              notFoundContent?.title ||
              defaultNotFoundTitle,

            notFoundDescription:
              notFoundContent?.description ||
              defaultNotFoundDescription
          };

        }),


        // =================================================
        // AEM ERROR → CONSTANT FALLBACK
        // =================================================

        catchError(error => {

          console.error(
            'Product Details AEM content loading failed. Using fallback content.',
            error
          );


          return of({

            backButton:
              '← Back to Products',

            addToCartButton:
              '🛒 Add to Cart',

            notFoundTitle:
              'Product Not Found',

            notFoundDescription:
              'The product you are looking for is not available.'
          });

        })
      );
  }

}