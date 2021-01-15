import { Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // add auth JWT to request
    const token = this.authService.getToken();
    console.log('in the interceptor and the token is ', token);
    const authRequest = request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + token)
    });

    return next.handle(authRequest);
  }
}
