import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { blogMocks } from '../../core/mocks/blogmocks';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  blogData = blogMocks;
  currentLanguageIndex = 0; // Keep this for getTranslatedText and other index-based logic
  currentPage = 1;
  postsPerPage = 6;

  constructor(
    private languageService: LanguageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize currentLanguageIndex from the service
    this.currentLanguageIndex = this.languageService.getCurrentLanguage();
    // Subscribe to language changes
    this.languageService.currentLanguage$.subscribe(index => {
      this.currentLanguageIndex = index;
    });
  }

  // New getter to provide the language code to the template
  get currentLanguageCode(): string {
    return this.languageService.getCurrentLanguageCode();
  }

  getTranslatedText(text: string | string[]): string {
    return Array.isArray(text) ? text[this.currentLanguageIndex] : text;
  }

  getPaginatedPosts() {
    const startIndex = (this.currentPage - 1) * this.postsPerPage;
    return this.blogData.posts.slice(startIndex, startIndex + this.postsPerPage);
  }

  getTotalPages() {
    return Math.ceil(this.blogData.posts.length / this.postsPerPage);
  }

  changePage(page: number) {
    this.currentPage = page;
    window.scrollTo(0, 0);
  }

  // Modified to return random posts
  getLatestPosts() {
    const allPosts = [...this.blogData.posts]; // Create a shallow copy to avoid modifying the original array
    // Shuffle the array
    for (let i = allPosts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allPosts[i], allPosts[j]] = [allPosts[j], allPosts[i]]; // ES6 swap
    }
    return allPosts.slice(0, 5); // Take the first 5 random posts
  }

  getFirstContentText(post: any): string {
    if (post.content && post.content.length > 0 && post.content[0].text) {
      return this.getTranslatedText(post.content[0].text);
    }
    return '';
  }
}