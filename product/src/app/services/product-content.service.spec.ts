import {
  TestBed
} from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import {
  ProductContentService
} from './product-content.service';

describe('ProductContentService', () => {

  let service: ProductContentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ProductContentService
      ]
    });

    service = TestBed.inject(
      ProductContentService
    );

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

  it('should load product content from AEM', () => {

    const mockResponse = {
      screenCoverage: 'multiple',
      moduleIdentifier: 'ecommerce',
      lastModified: '2026-09-13T00:00:00.000',
      content: [
        {
          screenIdentifier: 'products',
          screenContent: [
            {
              key: 'heading',
              title: 'AEM Test Heading',
              description: 'AEM Test Description',
              device: 'both'
            },
            {
              key: 'search',
              title: 'AEM Search',
              device: 'both'
            },
            {
              key: 'empty-state',
              title: 'AEM Empty',
              description: 'AEM Empty Description',
              device: 'both'
            }
          ]
        }
      ]
    };

    service.getProductContent().subscribe(content => {

      expect(content.heading)
        .toBe('AEM Test Heading');

      expect(content.description)
        .toBe('AEM Test Description');

      expect(content.searchPlaceholder)
        .toBe('AEM Search');

      expect(content.emptyTitle)
        .toBe('AEM Empty');

      expect(content.emptyDescription)
        .toBe('AEM Empty Description');

    });

    const request = httpMock.expectOne(
      'http://localhost:4200/assets/aem/product-content.json'
    );

    expect(request.request.method)
      .toBe('GET');

    request.flush(mockResponse);

  });

  it('should return fallback content when AEM fails', () => {

    service.getProductContent().subscribe(content => {

      expect(content.heading)
        .toBe('Discover Amazing Products');

      expect(content.description)
        .toBe(
          'Find quality products at the best prices.'
        );

      expect(content.searchPlaceholder)
        .toBe('Search products');

      expect(content.emptyTitle)
        .toBe('No products found');

      expect(content.emptyDescription)
        .toBe(
          'Try changing your search or filters.'
        );

    });

    const request = httpMock.expectOne(
      'http://localhost:4200/assets/aem/product-content.json'
    );

    expect(request.request.method)
      .toBe('GET');

    request.flush(
      'AEM Server Error',
      {
        status: 500,
        statusText: 'Internal Server Error'
      }
    );

  });

});