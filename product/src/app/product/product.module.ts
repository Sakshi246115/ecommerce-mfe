import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ApiInterceptor } from '../interceptors/api.interceptor';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ProductRoutingModule
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }
  ],

  exports: [
    ProductListComponent,
    ProductDetailsComponent
  ]
})
export class ProductModule {}