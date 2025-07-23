import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../core/services/language.service';
import { navbarMocks } from '../../../core/mocks/navbarmocks';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  navItems = navbarMocks;
  currentLanguageIndex = 0;
  isMobileMenuOpen = false;
  private languageSub!: Subscription;

  availableLanguages = [
    { code: 'tr', name: 'TÜRK' },
    { code: 'en', name: 'ENG' }
  ];

  languageFlags = [
    'assets/imgs/navbar/tr.svg',
    'assets/imgs/navbar/en.svg',
  ];

  constructor(
    private languageService: LanguageService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.currentLanguageIndex = this.languageService.getCurrentLanguage();
    this.languageSub = this.languageService.currentLanguage$.subscribe(
      index => this.currentLanguageIndex = index
    );
  }

  ngOnDestroy(): void {
    this.languageSub?.unsubscribe();
  }

  // Listen for window resize to close mobile menu on desktop
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth > 1024 && this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  }

  // Listen for escape key to close mobile menu
  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent) {
    if (this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  }

  getNavItemTitle(item: any): string {
    return Array.isArray(item.title) ? item.title[this.currentLanguageIndex] : item.title;
  }

  getLanguageFlag(index: number): string {
    return this.languageFlags[index];
  }

  toggleLanguage(): void {
    const nextIndex = (this.currentLanguageIndex + 1) % 2;
    this.languageService.setLanguage(nextIndex);
  }

  getOtherLanguageText(): string {
    return this.availableLanguages[(this.currentLanguageIndex + 1) % 2].name;
  }

  getOtherLanguageFlag(): string {
    return this.languageFlags[(this.currentLanguageIndex + 1) % 2];
  }

  get regularNavItems() {
    return this.navItems.filter(item => item.order >= 0 && item.order < 7);
  }

  hasDropdown(item: any) {
    return item.hasDropdown === true;
  }

  getDropdownItems(item: any) {
    return item.dropdownItems || [];
  }

  // Mobile menu methods
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    
    // Toggle body scroll
    if (this.isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      // Close all mobile dropdowns when closing menu
      this.closeAllMobileDropdowns();
    }
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    document.body.style.overflow = '';
    this.closeAllMobileDropdowns();
  }

  // Mobile dropdown methods - now using hover instead of click
  openMobileDropdown(item: any): void {
    if (this.hasDropdown(item)) {
      item.mobileDropdownOpen = true;
    }
  }

  closeMobileDropdown(item: any): void {
    if (this.hasDropdown(item)) {
      item.mobileDropdownOpen = false;
    }
  }

  private closeAllMobileDropdowns(): void {
    this.navItems.forEach(item => {
      item.mobileDropdownOpen = false;
    });
  }
}