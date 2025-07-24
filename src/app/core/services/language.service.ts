import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
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
      // If the URL doesn't start with a recognized language code,
      // navigate to the default language's home page.
      // This helps correct malformed initial URLs like /0/blog/2
      const defaultLangCode = this.indexToCode[this.currentLanguageIndex];
      const currentUrlSegments = this.router.url.split('/').filter(Boolean); // Filter(Boolean) removes empty strings
      
      // If the first segment is not a language code, correct the URL
      if (currentUrlSegments.length > 0 && this.languageMap[currentUrlSegments[0]] === undefined) {
        // Build the new URL with the correct language code
        currentUrlSegments[0] = defaultLangCode; // Replace the first segment with default lang
        const correctedUrl = '/' + currentUrlSegments.join('/');
        this.router.navigateByUrl(correctedUrl, { replaceUrl: true });
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
  this.router.navigateByUrl(newUrl);
}


  private updateUrlLanguage(url: string, langCode: string): string {
    const parts = url.split('/').filter(part => part !== ''); // filter(part => part !== '') removes empty strings from array

    // Check if the first part of the URL is already a language code (tr, en)
    if (parts.length > 0 && this.languageMap[parts[0]] !== undefined) {
      parts[0] = langCode; // Replace the existing language code
      return '/' + parts.join('/');
    }
    // If there's no language code (e.g., if the initial URL was just /blog/2 directly without /lang)
    // Or if the first part is NOT a recognized language code (e.g., /0/blog/2)
    // Prepend the new language code, and then try to maintain the rest of the path
    // We assume the rest of the path might be valid, so we join it.
    // Example: if url is '/0/blog/2' -> parts will be ['0', 'blog', '2']
    // then it will become '/en/blog/2'
    return '/' + langCode + '/' + parts.slice(1).join('/'); // Skip the problematic first part and prepend correct lang
  }
}