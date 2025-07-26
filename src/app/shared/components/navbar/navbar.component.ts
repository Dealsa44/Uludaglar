import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../core/services/language.service';
import { navbarMocks } from '../../../core/mocks/navbarmocks';
import { Router, RouterModule, NavigationEnd, ActivatedRoute } from '@angular/router'; // Import ActivatedRoute and NavigationEnd
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators'; // Import filter

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
    '/assets/imgs/navbar/tr.svg',
    '/assets/imgs/navbar/en.svg',
  ];

  constructor(
    private languageService: LanguageService,
    public router: Router,
    private activatedRoute: ActivatedRoute // Inject ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.currentLanguageIndex = this.languageService.getCurrentLanguage();
    this.languageSub = this.languageService.currentLanguage$.subscribe(
      index => this.currentLanguageIndex = index
    );

    // This is optional if routerLinkActive is sufficient, but useful for complex active states
    // For example, if you need to react to route changes for other logic
    // this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd)
    // ).subscribe(() => {
    //   // You can perform additional logic here if needed
    // });
  }

  ngOnDestroy(): void {
    this.languageSub?.unsubscribe();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth > 1024 && this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  }

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

  get currentLanguageCode(): string {
    return this.languageService.getCurrentLanguageCode();
  }

  get regularNavItems() {
    return this.navItems.filter(item => item.order >= 0 && item.order < 7);
  }

  hasDropdown(item: any): boolean {
    return item.hasDropdown === true;
  }

  getDropdownItems(item: any): any[] {
    return item.dropdownItems || [];
  }

  isLanguageToggle(item: any): boolean {
    return item.isLanguageToggle === true;
  }

  // Method to identify the Social Responsibility link
  isSocialResponsibilityLink(item: any): boolean {
    return (item.title && (item.title[0] === 'Sosyal Sorumluluk' || item.title[1] === 'Social Responsibility'));
  }

  // New method to check if a dropdown parent should be active
  isDropdownParentActive(item: any): boolean {
    if (!item.hasDropdown || !item.dropdownItems) {
      return false;
    }
    const currentUrl = this.router.url;
    return item.dropdownItems.some((dropItem: any) => {
      // Construct the full path for comparison
      const routeToCheck = `/${this.currentLanguageCode}/${dropItem.route}`;
      // Check if the current URL starts with the route of any dropdown item
      // This handles cases where child routes (e.g., /en/about-us/team) might exist
      return currentUrl.startsWith(routeToCheck);
    });
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;

    if (this.isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      this.closeAllMobileDropdowns();
    }
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    document.body.style.overflow = '';
    this.closeAllMobileDropdowns();
  }

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