import { Component, OnInit, OnDestroy } from '@angular/core';
import { footerMocks } from '../../../core/mocks/footermocks';
import { LanguageService } from '../../../core/services/language.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { blogMocks } from '../../../core/mocks/blogmocks';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, OnDestroy {
  footerData: any = footerMocks;
  currentLanguageIndex = 0;
  private languageSub!: Subscription;
  blogData = blogMocks;
  randomPopularPosts: any[] = [];

  constructor(
    private languageService: LanguageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentLanguageIndex = this.languageService.getCurrentLanguage();
    this.languageSub = this.languageService.currentLanguage$.subscribe(
      (index) => (this.currentLanguageIndex = index)
    );

    this.setRandomPopularPosts();
  }

  ngOnDestroy(): void {
    this.languageSub?.unsubscribe();
  }

  getTranslatedText(text: string | string[]): string {
    return Array.isArray(text) ? text[this.currentLanguageIndex] : text;
  }

  setRandomPopularPosts(): void {
    const allPosts = [...this.blogData.posts];
    for (let i = allPosts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allPosts[i], allPosts[j]] = [allPosts[j], allPosts[i]];
    }
    this.randomPopularPosts = allPosts.slice(0, 5);
  }

  get currentLanguageCode(): string {
    return this.languageService.getCurrentLanguageCode();
  }

  navigateToBlogPost(postId: number): void {
    this.router.navigate(['/', this.currentLanguageCode, 'blog', postId]);
  }

  getGlossaryPostId(): number | null {
    const glossaryPost = this.blogData.posts.find(
      (post) =>
        this.getTranslatedText(post.title) === 'Real Estate Glossary' ||
        this.getTranslatedText(post.title) === 'Emlak Terimler Sözlüğü'
    );
    return glossaryPost ? glossaryPost.id : null;
  }

  /**
   * Extracts the filename from a given URL.
   * @param url The full URL string.
   * @returns The filename part of the URL, or null if url is null.
   */
  getFileNameFromUrl(url: string | null): string | null {
    if (!url) {
      return null;
    }
    // Get the last part of the URL after the last '/'
    const parts = url.split('/');
    return parts[parts.length - 1];
  }
}