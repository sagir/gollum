import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../core/services/local-storage.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private storageService: LocalStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.storageService.getItem('_token');
    let headers: { Authorization: string } | undefined = undefined;

    // setting token if available
    if (token) {
      headers = {
        Authorization: `Bearer ${token}`
      };
    }

    return next.handle(request.clone({
      url: `${environment.endpoint}${request.url}`, // updating url
      setHeaders: headers // setting headers
    }));
  }
}
