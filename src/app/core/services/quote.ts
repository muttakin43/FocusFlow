import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface Quote {
  content: string;
  author: string;
}

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
   constructor(private http: HttpClient) {}

getRandomQuote(): Observable<Quote> {
    return this.http.get<any>(`${environment.quoteApiUrl}/quotes/random`).pipe(
      map(res => ({
        content: res.quote,
        author: res.author
      }))
    );
}
}
