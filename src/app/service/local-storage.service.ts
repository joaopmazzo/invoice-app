import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly platformId: object = inject(PLATFORM_ID);

  private changes$ = new BehaviorSubject<{ key: string; value: any }>({
    key: '',
    value: null,
  });

  setItem<T>(key: string, value: T): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        this.changes$.next({ key, value });
      } catch (e) {
        console.error('Error saving to localStorage', e);
      }
    }
  }

  getItem<T>(key: string, defaultValue: T | null = null): T | null {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
      } catch (e) {
        console.error('Error reading from localStorage', e);
        return defaultValue;
      }
    }
    return defaultValue;
  }

  removeItem(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(key);
      this.changes$.next({ key, value: null });
    }
  }

  clear(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
      this.changes$.next({ key: 'clear', value: null });
    }
  }

  watchStorage(): Observable<{ key: string; value: any }> {
    return this.changes$.asObservable();
  }
}
