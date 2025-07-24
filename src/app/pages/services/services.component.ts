import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { servicesMocks } from '../../core/mocks/servicesmocks';
import { LanguageService } from '../../core/services/language.service';
import { blogMocks } from '../../core/mocks/blogmocks'; // Import blogMocks

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  servicesData = servicesMocks;
  currentLanguageIndex = 0;
  blogData = blogMocks; // Make blogMocks available in the component

  constructor(
    private languageService: LanguageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentLanguageIndex = this.languageService.getCurrentLanguage();
    this.languageService.currentLanguage$.subscribe(index => {
      this.currentLanguageIndex = index;
    });
  }

  getTranslatedText(text: string | string[]): string {
    return Array.isArray(text) ? text[this.currentLanguageIndex] : text;
  }

  navigateToContact(): void {
    this.router.navigate([this.currentLanguageCode, 'contact']);
  }

  get currentLanguageCode(): string {
    return this.languageService.getCurrentLanguageCode();
  }

  /**
   * Navigates to the corresponding blog post based on the provided title.
   * @param title The title of the service/gallery item.
   */
  navigateToBlogPost(title: string | string[]): void {
    const translatedTitle = this.getTranslatedText(title);
    const post = this.blogData.posts.find(p => this.getTranslatedText(p.title) === translatedTitle);

    if (post) {
      this.router.navigate(['/', this.currentLanguageCode, 'blog', post.id]);
    } else {
      console.warn(`No blog post found for title: "${translatedTitle}"`);
      // Optionally, navigate to a default blog page or show a message
      // this.router.navigate(['/', this.currentLanguageCode, 'blog']);
    }
  }
}