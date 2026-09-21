import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    // Clone request and add common header
    const modifiedRequest = request.clone({
      setHeaders: {
        Accept: 'application/json'
      }
    });

    console.log(
      '[HTTP REQUEST]',
      modifiedRequest.method,
      modifiedRequest.url
    );

    return next.handle(modifiedRequest).pipe(

      catchError((error: HttpErrorResponse) => {

        console.error(
          '[HTTP ERROR]',
          error.status,
          error.message
        );

        // Send error back to the service/component
        return throwError(() => error);
      })

    );
  }
}