import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProductDetailsComponent } from './product-details.component';
import { ProductService } from '../../services/product.service';
import { ProductContentService } from '../../services/product-content.service';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductDetailsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1'
              }
            }
          }
        },
        {
          provide: ProductService,
          useValue: {
            getProductById: () =>
              of({
                id: 1,
                name: 'Test Product',
                description: 'Test description',
                price: 1000,
                category: 'Electronics',
                rating: 4.5,
                image: 'test.jpg',
                discount: 10,
                stock: 10
              }),
            updateProduct: () =>
              of({
                id: 1,
                title: 'Test Product',
                description: 'Test description',
                price: 100,
                category: 'smartphones',
                rating: 4.5,
                thumbnail: 'test.jpg',
                discountPercentage: 10,
                stock: 9
              })
          }
        },
        {
          provide: ProductContentService,
          useValue: {
            getProductDetailsContent: () =>
              of({
                backButton: '← Back to Products',
                addToCartButton: '🛒 Add to Cart',
                notFoundTitle: 'Product Not Found',
                notFoundDescription:
                  'The product you are looking for is not available.'
              })
          }
        }
      ]
    })
      .overrideComponent(ProductDetailsComponent, {
        set: {
          template: '<div>Product Details Test</div>'
        }
      })
      .compileComponents();

    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load product details', () => {
    expect(component.product).toBeTruthy();
    expect(component.product?.name).toBe('Test Product');
  });

  it('should load AEM product details content', () => {
    expect(component.detailsContent.addToCartButton).toBe('🛒 Add to Cart');
  });
});