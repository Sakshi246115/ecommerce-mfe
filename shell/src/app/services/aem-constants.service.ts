import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AemConstantsService {
  // Replace with your existing AEM JSON endpoint URL
  private readonly aemJsonUrl = '/content/dam/ecommerce/constants.json';
  
  // In-memory cache stream
  private aemData$?: Observable<any>;

  constructor(private http: HttpClient) {}

  getAemConstants(): Observable<any> {
    if (!this.aemData$) {
      this.aemData$ = this.http.get<any>(this.aemJsonUrl).pipe(
        shareReplay(1), // Prevents repeated HTTP fetches & flicker across Shell and Remotes
        catchError(err => {
          console.error('AEM Constants load failed, serving fallback constants', err);
          throw err;
        })
      );
    }
    return this.aemData$;
  }
}