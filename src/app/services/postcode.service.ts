import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostcodeService {
  private apiUrl = 'https://api.postcodes.io';

  constructor(private http: HttpClient) { }

  // Query a postcode
  getPostcode(postcode: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/postcodes/${postcode}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Handle HTTP error
  private handleError(error: HttpErrorResponse): Observable<never> {
    // Log the error to the console or send it to a logging service
    console.error('An error occurred:', error.message);
    return throwError('Something went wrong; please try again later.');
  }
}
