import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  catchError,
  Observable,
  ObservableInput,
  shareReplay,
  switchMap,
  throwError,
} from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';
import { User } from '../../modules/auth/models/User';
import { TokenResponse } from './../../modules/auth/models/TokenResponse';
import { Router } from '@angular/router';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  private refreshTokenRequest$: Observable<TokenResponse> | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private storageService: LocalStorageService
  ) {}

  private getRefreshTokenRequest(token: string): Observable<TokenResponse> {
    if (!this.refreshTokenRequest$) {
      this.refreshTokenRequest$ = this.authService
        .refreshToken(token)
        .pipe(shareReplay());
    }

    return this.refreshTokenRequest$;
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse): ObservableInput<any> => {
        const token = this.storageService.getItem<string | undefined>(
          '_refreshToken'
        );
        const user = this.storageService.getItem<User | null>('_user');

        if (error.status === 401 && token && user) {
          return this.getRefreshTokenRequest(token).pipe(
            switchMap((res) => {
              this.refreshTokenRequest$ = null;
              this.authService.storeLoginResponse({ user, ...res });
              return next.handle(
                request.clone({
                  setHeaders: { Authorization: `Bearer ${res.token}` },
                })
              );
            }),
            catchError((error) => {
              this.refreshTokenRequest$ = null;
              this.authService.logout();
              this.router.navigate(['auth', 'login']);
              return throwError(() => error);
            })
          );
        }

        return throwError(() => error);
      })
    );
  }
}
