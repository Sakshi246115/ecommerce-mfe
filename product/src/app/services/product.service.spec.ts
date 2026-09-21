import {
  TestBed
} from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import {
  ProductService
} from './product.service';

describe('ProductService', () => {

  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ProductService
      ]
    });

    service = TestBed.inject(ProductService);

    httpMock = TestBed.inject(
      HttpTestingController
    );
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {

    expect(service).toBeTruthy();

  });

  it('should get products', () => {

    const mockResponse = {
      products: [
        {
          id: 1,
          title: 'Test Smartphone',
          description: 'Test product',
          price: 100,
          category: 'smartphones',
          rating: 4.5,
          thumbnail: 'test-image.jpg',
          discountPercentage: 10,
          stock: 20
        }
      ]
    };

    service.getProducts().subscribe(products => {

      expect(products.length).toBe(1);

      expect(products[0].name)
        .toBe('Test Smartphone');

      expect(products[0].category)
        .toBe('Electronics');

      expect(products[0].price)
        .toBe(8300);

    });

    const request = httpMock.expectOne(
      'https://dummyjson.com/products?limit=100'
    );

    expect(request.request.method).toBe('GET');

    request.flush(mockResponse);

  });

  it('should return fallback products when API fails', () => {

    service.getProducts().subscribe(products => {

      expect(products.length).toBe(3);

      expect(products[0].name)
        .toBe('Smartphone');

      expect(products[1].name)
        .toBe('Laptop');

      expect(products[2].name)
        .toBe('Headphones');

    });

    const request = httpMock.expectOne(
      'https://dummyjson.com/products?limit=100'
    );

    expect(request.request.method).toBe('GET');

    request.flush(
      'API Error',
      {
        status: 500,
        statusText: 'Internal Server Error'
      }
    );

  });

  it('should patch a product', () => {

    const updateData = {
      stock: 19
    };

    const mockResponse = {
      id: 1,
      title: 'Test Smartphone',
      description: 'Test product',
      price: 100,
      category: 'smartphones',
      rating: 4.5,
      thumbnail: 'test-image.jpg',
      discountPercentage: 10,
      stock: 19
    };

    service.updateProduct(
      1,
      updateData
    ).subscribe(response => {

      expect(response.id).toBe(1);

      expect(response.stock).toBe(19);

    });

    const request = httpMock.expectOne(
      'https://dummyjson.com/products/1'
    );

    expect(request.request.method).toBe('PATCH');

    expect(request.request.body)
      .toEqual(updateData);

    request.flush(mockResponse);

  });

});