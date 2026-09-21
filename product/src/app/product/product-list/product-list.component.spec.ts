import { TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../../services/product.service';
import { ProductContentService } from '../../services/product-content.service';
import { of } from 'rxjs';

describe('ProductListComponent', () => {
  let component: ProductListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      providers: [
        {
          provide: ProductService,
          useValue: {
            getProducts: () => of([])
          }
        },
        {
          provide: ProductContentService,
          useValue: {
            getProductContent: () =>
              of({
                heading: 'Discover Amazing Products',
                description: 'Find quality products at the best prices.',
                searchPlaceholder: 'Search products',
                emptyTitle: 'No products found',
                emptyDescription: 'Try changing your search or filters.'
              })
          }
        }
      ]
    })
      .overrideComponent(ProductListComponent, {
        set: {
          template: '<div>Product List Test</div>'
        }
      })
      .compileComponents();

    const fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});