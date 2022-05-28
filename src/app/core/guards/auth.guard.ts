import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private storageService: LocalStorageService
  ) {}

  canActivate(): boolean | UrlTree {
    if (this.storageService.getItem('_token')) {
      return true;
    } else {
      return this.router.createUrlTree(['auth', 'login']);
    }
  }
}
