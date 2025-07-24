import { Component, OnInit, OnDestroy } from '@angular/core';
import { footerMocks } from '../../../core/mocks/footermocks';
import { LanguageService } from '../../../core/services/language.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; // Import RouterModule and Router
import { blogMocks } from '../../../core/mocks/blogmocks'; // Import blogMocks

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule], // Add RouterModule here
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  footerData = footerMocks;
  currentLanguageIndex = 0;
  private languageSub!: Subscription;
  blogData = blogMocks; // Make blogMocks available in the component
  randomPopularPosts: any[] = []; // New property to store random popular posts

  constructor(
    private languageService: LanguageService,
    private router: Router // Inject Router
  ) {}

  ngOnInit(): void {
    this.currentLanguageIndex = this.languageService.getCurrentLanguage();
    this.languageSub = this.languageService.currentLanguage$.subscribe(
      index => this.currentLanguageIndex = index
    );

    // Populate random popular posts on init
    this.setRandomPopularPosts();
  }

  ngOnDestroy(): void {
    this.languageSub?.unsubscribe();
  }

  getTranslatedText(text: string | string[]): string {
    return Array.isArray(text) ? text[this.currentLanguageIndex] : text;
  }

  // Method to get a random subset of blog posts, similar to your blog component
  setRandomPopularPosts(): void {
    const allPosts = [...this.blogData.posts]; // Create a shallow copy
    // Shuffle the array
    for (let i = allPosts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allPosts[i], allPosts[j]] = [allPosts[j], allPosts[i]]; // ES6 swap
    }
    // Take the first 5 random posts (or however many you want for popular posts)
    this.randomPopularPosts = allPosts.slice(0, 5);
  }

  // Helper to get the current language code for routing
  get currentLanguageCode(): string {
    return this.languageService.getCurrentLanguageCode();
  }

  // Method to navigate to a specific blog post
  navigateToBlogPost(postId: number): void {
    this.router.navigate(['/', this.currentLanguageCode, 'blog', postId]);
  }
}