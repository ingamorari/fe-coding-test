import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = '7c78a19020109d8442bfcd3f9775e42af949f934ffe7178428b6ed94497f1336';
    if (token) {
      request = this.addToken(request, token);
    }
    return next.handle(request).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          // localStorage.removeItem('tokens');
          // void this.router.navigate(['/login']);
          return throwError(error);
        } else {
          return throwError(error);
        }
      })
    );
  }

  /** add token to the request */
  addToken(request: HttpRequest<any>, token: string) {
    // If access token is null this means that user is not logged in
    // And we return the original request
    if (!token) {
      return request;
    }

    // We clone the request, because the original request is immutable
    return request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + token)
    });
  }
}
