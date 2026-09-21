import { Component, OnInit } from '@angular/core';

import {
  RevampFallbackService,
  HomeScreenContent
} from '../services/revamp-fallback.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  homeContent: HomeScreenContent = {

    // Hero section

    badge:
      'Welcome to My Ecommerce',

    title:
      'Everything You Need,',

    heading:
      'Everything You Need,',

    headingHighlight:
      'All in One Place.',

    description:
      'Discover quality products at amazing prices. Shop electronics, fashion and home essentials.',

    // Categories section

    categoriesBadge:
      'EXPLORE',

    categoriesTitle:
      'Shop by Category',

    categoriesDescription:
      'Find everything you need from our popular categories.',

    // Electronics

    electronicsTitle:
      'Electronics',

    electronicsDescription:
      'Smartphones, laptops, headphones and more.',

    electronicsButton:
      'Shop Electronics →',

    // Fashion

    fashionTitle:
      'Fashion',

    fashionDescription:
      'Discover the latest fashion and trends.',

    fashionButton:
      'Shop Fashion →',

    // Home category

    homeCategoryTitle:
      'Home',

    homeCategoryDescription:
      'Make your home comfortable and beautiful.',

    homeCategoryButton:
      'Shop Home →',

    // Features

    fastDeliveryTitle:
      'Fast Delivery',

    fastDeliveryDescription:
      'Quick and reliable delivery.',

    securePaymentTitle:
      'Secure Payment',

    securePaymentDescription:
      'Your payment is always protected.',

    qualityProductsTitle:
      'Quality Products',

    qualityProductsDescription:
      'Products selected for you.'

  };

  isLoading = true;

  constructor(
    private revampFallbackService:
      RevampFallbackService
  ) {}

  ngOnInit(): void {

    this.loadHomeContent();

  }

  private loadHomeContent(): void {

    this.revampFallbackService
      .getHomeContent()
      .subscribe({

        next: (
          content: HomeScreenContent
        ) => {

          this.homeContent =
            content;

          this.isLoading =
            false;

        },

        error: (error) => {

          console.error(
            'Failed to load Home content:',
            error
          );

          this.isLoading =
            false;

        }

      });

  }

}