import {
  Component,
  OnInit
} from '@angular/core';

import {
  ActivatedRoute
} from '@angular/router';

import {
  Product
} from '../../models/product';

import {
  ProductService,
  ProductUpdateData
} from '../../services/product.service';

import {
  ProductContentService,
  ProductDetailsContent
} from '../../services/product-content.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product | undefined;

  isUpdating = false;


  detailsContent: ProductDetailsContent = {

    backButton:
      '← Back to Products',

    addToCartButton:
      '🛒 Add to Cart',

    notFoundTitle:
      'Product Not Found',

    notFoundDescription:
      'The product you are looking for is not available.'
  };


  constructor(
    private route: ActivatedRoute,

    private productService: ProductService,

    private productContentService:
      ProductContentService
  ) {}


  // ===================================================
  // INIT
  // ===================================================

  ngOnInit(): void {

    this.loadDetailsContent();

    this.loadProduct();
  }


  // ===================================================
  // LOAD AEM CONTENT
  // ===================================================

  private loadDetailsContent(): void {

    this.productContentService
      .getProductDetailsContent()

      .subscribe({

        next:
          (content: ProductDetailsContent) => {

            this.detailsContent =
              content;
          },

        error:
          (error: unknown) => {

            console.error(
              'Failed to load Product Details content:',
              error
            );
          }

      });
  }


  // ===================================================
  // LOAD PRODUCT
  // ===================================================

  private loadProduct(): void {

    const productId =
      Number(
        this.route.snapshot
          .paramMap
          .get('id')
      );


    this.productService
      .getProductById(productId)

      .subscribe({

        next:
          (product: Product | undefined) => {

            this.product =
              product;
          },

        error:
          (error: unknown) => {

            console.error(
              'Failed to load product details:',
              error
            );

            this.product =
              undefined;
          }

      });
  }


  // ===================================================
  // PATCH PRODUCT
  // ===================================================

  patchProduct(): void {

    // Product available आहे का check
    if (!this.product) {

      return;
    }


    // Already updating असेल तर duplicate request
    // होऊ नये
    if (this.isUpdating) {

      return;
    }


    this.isUpdating = true;


    // -------------------------------------------------
    // PATCH DATA
    // -------------------------------------------------

    const updateData:
      ProductUpdateData = {

      stock:
        Math.max(
          this.product.stock - 1,
          0
        )
    };


    console.log(
      '[PATCH REQUEST]',
      {
        productId:
          this.product.id,

        updateData:
          updateData
      }
    );


    // -------------------------------------------------
    // PATCH API CALL
    // -------------------------------------------------

    this.productService
      .updateProduct(
        this.product.id,
        updateData
      )

      .subscribe({

        // ---------------------------------------------
        // SUCCESS
        // ---------------------------------------------

        next:
          updatedProduct => {

            console.log(
              '[PATCH SUCCESS]',
              updatedProduct
            );


            this.isUpdating =
              false;


            alert(
              'Product data patched successfully!'
            );
          },


        // ---------------------------------------------
        // ERROR
        // ---------------------------------------------

        error:
          (error: unknown) => {

            console.error(
              '[PATCH ERROR]',
              error
            );


            this.isUpdating =
              false;


            alert(
              'Failed to patch product data.'
            );
          }

      });
  }


  // ===================================================
  // ADD TO CART
  // ===================================================

  addToCart(): void {

    if (this.product) {

      alert(
        `${this.product.name} added successfully!`
      );
    }
  }

}