import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../../models/product';

import {
  PRODUCT_CATEGORIES,
  PRODUCT_PRICE_FILTERS,
  PRODUCT_RATING_FILTERS,
  PRODUCT_SORT_OPTIONS
} from '../../constants/product.constants';

import { ProductService } from '../../services/product.service';

import {
  ProductContentService,
  ProductScreenContent
} from '../../services/product-content.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  filteredProducts: Product[] = [];

  isLoading = true;

  searchText = '';

  selectedCategory: string =
    PRODUCT_CATEGORIES.ALL;

  selectedPriceFilter: string =
    PRODUCT_PRICE_FILTERS.ALL;

  selectedRatingFilter: string =
    PRODUCT_RATING_FILTERS.ALL;

  selectedSort: string =
    PRODUCT_SORT_OPTIONS.DEFAULT;

  productContent: ProductScreenContent = {
    heading: 'Discover Amazing Products',

    description:
      'Find quality products at the best prices.',

    searchPlaceholder:
      'Search products',

    emptyTitle:
      'No products found',

    emptyDescription:
      'Try changing your search or filters.'
  };

  private readonly CART_KEY =
    'ecommerce-cart';

  private readonly CART_EVENT =
    'cart-updated';

  constructor(
    private productService: ProductService,

    private productContentService:
      ProductContentService,

    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.loadProductContent();

    this.loadProducts();

    this.route.queryParams.subscribe(params => {

      const category =
        params['category'];

      if (category) {

        this.filterByCategory(category);

      }

    });
  }

  private loadProductContent(): void {

    this.productContentService
      .getProductContent()
      .subscribe({

        next: (
          content: ProductScreenContent
        ) => {

          this.productContent =
            content;

        },

        error: (error) => {

          console.error(
            'Failed to load Product content:',
            error
          );

        }

      });

  }

  private loadProducts(): void {

    this.isLoading = true;

    this.productService
      .getProducts()
      .subscribe({

        next: (
          products: Product[]
        ) => {

          this.products =
            products;

          this.filteredProducts =
            [...products];

          this.isLoading = false;

          const category =
            this.route.snapshot
              .queryParamMap
              .get('category');

          if (category) {

            this.filterByCategory(
              category
            );

          }

        },

        error: (error) => {

          console.error(
            'Failed to load products:',
            error
          );

          this.products = [];

          this.filteredProducts = [];

          this.isLoading = false;

        }

      });

  }

  searchProducts(
    searchText: string
  ): void {

    this.searchText =
      searchText;

    this.applyFilters();

  }

  filterByCategory(
    category: string
  ): void {

    this.selectedCategory =
      category;

    this.applyFilters();

  }

  filterByPrice(
    priceFilter: string
  ): void {

    this.selectedPriceFilter =
      priceFilter;

    this.applyFilters();

  }

  filterByRating(
    ratingFilter: string
  ): void {

    this.selectedRatingFilter =
      ratingFilter;

    this.applyFilters();

  }

  sortProducts(
    sortOption: string
  ): void {

    this.selectedSort =
      sortOption;

    this.applyFilters();

  }

  private applyFilters(): void {

    const search =
      this.searchText
        .toLowerCase()
        .trim();

    this.filteredProducts =
      this.products.filter(
        product => {

          const matchesSearch =
            !search ||
            product.name
              .toLowerCase()
              .includes(search) ||
            product.description
              .toLowerCase()
              .includes(search) ||
            product.category
              .toLowerCase()
              .includes(search);

          const matchesCategory =
            this.selectedCategory ===
              PRODUCT_CATEGORIES.ALL ||
            product.category ===
              this.selectedCategory;

          const matchesPrice =
            this.isPriceMatch(
              product.price
            );

          const matchesRating =
            this.isRatingMatch(
              product.rating
            );

          return (
            matchesSearch &&
            matchesCategory &&
            matchesPrice &&
            matchesRating
          );

        }
      );

    this.applySorting();

  }

  private isPriceMatch(
    price: number
  ): boolean {

    switch (
      this.selectedPriceFilter
    ) {

      case PRODUCT_PRICE_FILTERS.UNDER_1000:

        return price < 1000;

      case PRODUCT_PRICE_FILTERS.FROM_1000_TO_5000:

        return (
          price >= 1000 &&
          price <= 5000
        );

      case PRODUCT_PRICE_FILTERS.FROM_5000_TO_20000:

        return (
          price > 5000 &&
          price <= 20000
        );

      case PRODUCT_PRICE_FILTERS.ABOVE_20000:

        return price > 20000;

      default:

        return true;
    }

  }

  private isRatingMatch(
    rating: number
  ): boolean {

    switch (
      this.selectedRatingFilter
    ) {

      case PRODUCT_RATING_FILTERS.FOUR_AND_ABOVE:

        return rating >= 4;

      case PRODUCT_RATING_FILTERS.THREE_AND_ABOVE:

        return rating >= 3;

      case PRODUCT_RATING_FILTERS.TWO_AND_ABOVE:

        return rating >= 2;

      default:

        return true;
    }

  }

  private applySorting(): void {

    switch (
      this.selectedSort
    ) {

      case PRODUCT_SORT_OPTIONS.PRICE_LOW_TO_HIGH:

        this.filteredProducts.sort(
          (a, b) =>
            a.price - b.price
        );

        break;

      case PRODUCT_SORT_OPTIONS.PRICE_HIGH_TO_LOW:

        this.filteredProducts.sort(
          (a, b) =>
            b.price - a.price
        );

        break;

      case PRODUCT_SORT_OPTIONS.RATING_HIGH_TO_LOW:

        this.filteredProducts.sort(
          (a, b) =>
            b.rating - a.rating
        );

        break;

      default:

        break;
    }

  }

  addToCart(
    product: Product
  ): void {

    let cart: any[] = [];

    const savedCart =
      localStorage.getItem(
        this.CART_KEY
      );

    if (savedCart) {

      try {

        const parsedCart =
          JSON.parse(savedCart);

        if (
          Array.isArray(parsedCart)
        ) {

          cart = parsedCart;

        }

      } catch {

        cart = [];

      }

    }

    const existingProduct =
      cart.find(
        item =>
          item.id === product.id
      );

    if (existingProduct) {

      existingProduct.quantity += 1;

    } else {

      cart.push({

        id: product.id,

        name: product.name,

        description:
          product.description,

        price: product.price,

        image: product.image,

        category:
          product.category,

        quantity: 1

      });

    }

    /*
     * Save cart in localStorage
     */
    localStorage.setItem(
      this.CART_KEY,
      JSON.stringify(cart)
    );

    /*
     * Notify Shell / Cart
     * that the cart changed
     */
    window.dispatchEvent(
      new CustomEvent(
        this.CART_EVENT,
        {
          detail: cart
        }
      )
    );

    /*
     * Show confirmation
     */
    alert(
      `${product.name} added to cart successfully!`
    );

    /*
     * Tell Shell to open
     * the Cart page
     */
    window.dispatchEvent(
      new CustomEvent(
        'navigate-to-cart'
      )
    );

  }

}