import { Inject, Injectable, InjectionToken } from '@angular/core';

const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage
});

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor(@Inject(BROWSER_STORAGE) private storage: Storage) { }

  getItem<T>(key: string): T | null {
    const value = this.storage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  setItem(key: string, value: any): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string): void {
    this.storage.removeItem(key);
  }
}
