import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { User } from 'src/app/modules/auth/models/User';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { LoginRequest } from '../models/LoginRequest';
import { LoginResponse } from '../models/LoginResponse';
import { RegistrationRequest } from '../models/RegistrationRequest';
import { TokenResponse } from '../models/TokenResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSubject$!: BehaviorSubject<string | null>;
  tokenObservable$!: Observable<string | null>;

  private refreshTokenSubject$!: BehaviorSubject<string | null>;
  refreshTokenObservable$!: Observable<string | null>;

  private userSubject$!: BehaviorSubject<User | null>;
  userObservable$!: Observable<User | null>;

  constructor(
    private http: HttpClient,
    private storageService: LocalStorageService
  ) {
    const token = this.storageService.getItem<string>('_token');
    const refreshToken = this.storageService.getItem<string>('_refreshToken');
    const user = this.storageService.getItem<User>('_user');

    this.tokenSubject$ = new BehaviorSubject(token);
    this.tokenObservable$ = this.tokenSubject$.asObservable();

    this.refreshTokenSubject$ = new BehaviorSubject(refreshToken);
    this.refreshTokenObservable$ = this.refreshTokenSubject$.asObservable();

    this.userSubject$ = new BehaviorSubject(user);
    this.userObservable$ = this.userSubject$.asObservable();
  }

  async login(data: LoginRequest): Promise<boolean> {
    try {
      const res = await lastValueFrom(this.http.post<LoginResponse>('v1/auth/login', data));
      this.storeLoginResponse(res);
      return true;
    } catch (error) {
      return false;
    }
  }

  async register(data: RegistrationRequest): Promise<boolean> {
    try {
      const res = await lastValueFrom(this.http.post<LoginResponse>('v1/auth/register', data));
      this.storeLoginResponse(res);
      return true;
    } catch (error) {
      return false;
    }
  }

  storeLoginResponse({ user, token, refreshToken }: LoginResponse): void {
    this.storageService.setItem('_token', token);
    this.storageService.setItem('_refreshToken', refreshToken);
    this.storageService.setItem('_user', user);

    this.tokenSubject$.next(token);
    this.refreshTokenSubject$.next(refreshToken);
    this.userSubject$.next(user);
  }

  logout(): void {
    this.storageService.removeItem('_token');
    this.storageService.removeItem('_refreshToken');
    this.storageService.removeItem('_user');

    this.tokenSubject$.next(null);
    this.refreshTokenSubject$.next(null);
    this.userSubject$.next(null);
  }

  refreshToken(token: string): Observable<TokenResponse> {
    return this.http.post<TokenResponse>('v1/refresh-token', { token });
  }
}
