import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router'; // Import NavigationExtras
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly STORAGE_KEY = 'selectedLanguageIndex';

  private languageMap: { [key: string]: number } = {
    'tr': 0,
    'en': 1,
  };

  private indexToCode: { [key: number]: string } = {
    0: 'tr',
    1: 'en',
  };

  private currentLanguageIndex = this.getSavedLanguageIndex();
  public currentLanguage$ = new BehaviorSubject<number>(this.currentLanguageIndex);

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.initializeLanguageFromUrl();
  }

  private initializeLanguageFromUrl(): void {
    const urlLang = this.router.url.split('/')[1];
    if (urlLang && this.languageMap[urlLang] !== undefined) {
      this.setLanguage(this.languageMap[urlLang]);
    } else {
      const defaultLangCode = this.indexToCode[this.currentLanguageIndex];
      const currentUrlSegments = this.router.url.split('/').filter(Boolean);

      if (currentUrlSegments.length > 0 && this.languageMap[currentUrlSegments[0]] === undefined) {
        currentUrlSegments[0] = defaultLangCode;
        const correctedUrl = '/' + currentUrlSegments.join('/');
        // When navigating during initialization, we also want to prevent scroll to top
        const navigationExtras: NavigationExtras = { replaceUrl: true, state: { skipScrollToTop: true } };
        this.router.navigateByUrl(correctedUrl, navigationExtras);
      }
    }
  }

  private getSavedLanguageIndex(): number {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      return saved !== null ? +saved : 0;
    }
    return 0; // Default if SSR
  }

  getCurrentLanguage(): number {
    return this.currentLanguageIndex;
  }

  getCurrentLanguageCode(): string {
    return this.indexToCode[this.currentLanguageIndex];
  }

  setLanguage(index: number): void {
    this.currentLanguageIndex = index;

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.STORAGE_KEY, index.toString());
    }

    this.currentLanguage$.next(index);

    const langCode = this.indexToCode[index];
    const currentUrl = this.router.url;
    const newUrl = this.updateUrlLanguage(currentUrl, langCode);

    // Pass state to skip scroll to top for language changes
    const navigationExtras: NavigationExtras = { state: { skipScrollToTop: true } };
    this.router.navigateByUrl(newUrl, navigationExtras);
  }

  private updateUrlLanguage(url: string, langCode: string): string {
    const parts = url.split('/').filter(part => part !== '');

    if (parts.length > 0 && this.languageMap[parts[0]] !== undefined) {
      parts[0] = langCode;
      return '/' + parts.join('/');
    }
    return '/' + langCode + '/' + parts.slice(1).join('/');
  }
}