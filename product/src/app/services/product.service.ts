import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  Observable,
  map,
  catchError,
  of
} from 'rxjs';

import { Product } from '../models/product';


// =====================================================
// API PRODUCT MODEL
// =====================================================

interface ApiProduct {

  id: number;

  title: string;

  description: string;

  price: number;

  category: string;

  rating: number;

  thumbnail: string;

  discountPercentage: number;

  stock: number;
}


// =====================================================
// API RESPONSE MODEL
// =====================================================

interface ApiResponse {

  products: ApiProduct[];
}


// =====================================================
// PATCH DATA MODEL
// =====================================================

export interface ProductUpdateData {

  price?: number;

  stock?: number;

  discountPercentage?: number;
}


// =====================================================
// PRODUCT SERVICE
// =====================================================

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // ===================================================
  // BASE API URL
  // ===================================================

  private readonly apiUrl =
    'https://dummyjson.com/products';


  // ===================================================
  // PRODUCTS API URL
  // ===================================================

  private readonly productsUrl =
    'https://dummyjson.com/products?limit=100';


  // ===================================================
  // FALLBACK PRODUCTS
  // ===================================================

  private readonly fallbackProducts: Product[] = [

    {
      id: 1,
      name: 'Smartphone',
      description: 'Latest smartphone with powerful performance.',
      price: 19999,
      category: 'Electronics',
      rating: 4.5,
      image: 'https://cdn.dummyjson.com/product-images/smartphones/iphone-13/1.webp',
      discount: 10,
      stock: 20
    },

    {
      id: 2,
      name: 'Laptop',
      description: 'High-performance laptop for work and entertainment.',
      price: 54999,
      category: 'Electronics',
      rating: 4.6,
      image: 'https://cdn.dummyjson.com/product-images/laptops/macbook-pro/1.webp',
      discount: 8,
      stock: 15
    },

    {
      id: 3,
      name: 'Headphones',
      description: 'Wireless headphones with clear sound quality.',
      price: 2999,
      category: 'Electronics',
      rating: 4.3,
      image: 'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods/1.webp',
      discount: 15,
      stock: 30
    }

  ];


  // ===================================================
  // CONSTRUCTOR
  // ===================================================

  constructor(
    private http: HttpClient
  ) {}


  // ===================================================
  // GET PRODUCTS
  // ===================================================

  getProducts(): Observable<Product[]> {

    return this.http
      .get<ApiResponse>(this.productsUrl)

      .pipe(

        map(response => {

          const allowedProducts =
            response.products.filter(
              product =>
                this.isEcommerceProduct(
                  product.category
                )
            );


          return allowedProducts
            .slice(0, 20)
            .map(product => ({

              id:
                product.id,

              name:
                product.title,

              description:
                product.description,

              price:
                Math.round(
                  product.price * 83
                ),

              category:
                this.mapCategory(
                  product.category
                ),

              image:
                product.thumbnail,

              discount:
                Math.round(
                  product.discountPercentage
                ),

              stock:
                product.stock,

              rating:
                product.rating

            }));

        }),

        catchError(error => {

          console.error(
            '[PRODUCT API ERROR]',
            error
          );

          console.warn(
            '[PRODUCT FALLBACK] Using fallback products.'
          );

          return of(
            this.fallbackProducts
          );

        })

      );
  }


  // ===================================================
  // GET PRODUCT BY ID
  // ===================================================

  getProductById(
    id: number
  ): Observable<Product | undefined> {

    return this.getProducts()

      .pipe(

        map(products =>
          products.find(
            product =>
              product.id === id
          )
        )

      );
  }


  // ===================================================
  // PATCH PRODUCT
  // ===================================================

  updateProduct(
    id: number,
    updateData: ProductUpdateData
  ): Observable<ApiProduct> {

    return this.http.patch<ApiProduct>(
      `${this.apiUrl}/${id}`,
      updateData
    );

  }


  // ===================================================
  // CHECK ECOMMERCE CATEGORY
  // ===================================================

  private isEcommerceProduct(
    category: string
  ): boolean {

    const ecommerceCategories = [

      'smartphones',

      'laptops',

      'tablets',

      'mobile-accessories',

      'mens-shirts',

      'mens-shoes',

      'mens-watches',

      'womens-dresses',

      'womens-shoes',

      'womens-bags',

      'womens-jewellery',

      'sunglasses',

      'furniture',

      'home-decoration'

    ];


    return ecommerceCategories.includes(
      category.toLowerCase()
    );

  }


  // ===================================================
  // MAP CATEGORY
  // ===================================================

  private mapCategory(
    category: string
  ): string {

    const normalizedCategory =
      category.toLowerCase();


    if (

      normalizedCategory.includes(
        'smartphone'
      ) ||

      normalizedCategory.includes(
        'laptop'
      ) ||

      normalizedCategory.includes(
        'tablet'
      ) ||

      normalizedCategory.includes(
        'mobile'
      )

    ) {

      return 'Electronics';
    }


    if (

      normalizedCategory.includes(
        'shirt'
      ) ||

      normalizedCategory.includes(
        'dress'
      ) ||

      normalizedCategory.includes(
        'shoe'
      ) ||

      normalizedCategory.includes(
        'watch'
      ) ||

      normalizedCategory.includes(
        'bag'
      ) ||

      normalizedCategory.includes(
        'jewellery'
      ) ||

      normalizedCategory.includes(
        'sunglasses'
      )

    ) {

      return 'Fashion';
    }


    return 'Home';
  }

}