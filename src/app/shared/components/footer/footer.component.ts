  import { Component, OnInit, OnDestroy } from '@angular/core';
  import { footerMocks } from '../../../core/mocks/footermocks';
  import { LanguageService } from '../../../core/services/language.service';
  import { Subscription } from 'rxjs';
  import { CommonModule } from '@angular/common';

  @Component({
    selector: 'app-footer',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
  })
  export class FooterComponent implements OnInit, OnDestroy {
    footerData = footerMocks;
    currentLanguageIndex = 0;
    private languageSub!: Subscription;

    constructor(private languageService: LanguageService) {}

    ngOnInit(): void {
      this.currentLanguageIndex = this.languageService.getCurrentLanguage();
      this.languageSub = this.languageService.currentLanguage$.subscribe(
        index => this.currentLanguageIndex = index
      );
    }

    ngOnDestroy(): void {
      this.languageSub?.unsubscribe();
    }

    getTranslatedText(text: string | string[]): string {
      return Array.isArray(text) ? text[this.currentLanguageIndex] : text;
    }
  }