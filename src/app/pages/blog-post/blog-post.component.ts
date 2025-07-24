import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { blogMocks } from '../../core/mocks/blogmocks';
import { LanguageService } from '../../core/services/language.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss'],
})
export class BlogPostComponent implements OnInit {
  blogData = blogMocks;
  currentLanguageIndex = 0;
  postId: number = 0;
  post: any;
  previousPost: any;
  nextPost: any;

  constructor(
    private languageService: LanguageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentLanguageIndex = this.languageService.getCurrentLanguage();
    this.languageService.currentLanguage$.subscribe((index) => {
      this.currentLanguageIndex = index;
    });

    this.route.params.subscribe((params) => {
      this.postId = +params['id'];
      this.post = this.blogData.posts.find((p) => p.id === this.postId);

      const currentIndex = this.blogData.posts.findIndex((p) => p.id === this.postId);
      this.previousPost = currentIndex > 0 ? this.blogData.posts[currentIndex - 1] : null;
      this.nextPost =
        currentIndex < this.blogData.posts.length - 1 ? this.blogData.posts[currentIndex + 1] : null;
    });
  }

  // New getter to provide the language code to the template
  get currentLanguageCode(): string {
    return this.languageService.getCurrentLanguageCode();
  }

  getTranslatedText(text: string | string[]): string {
    return Array.isArray(text) ? text[this.currentLanguageIndex] : text;
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

  /**
   * Generates a Google Maps link for a given address.
   * Encodes the address for use in a URL.
   * @param address The address to generate the map link for.
   * @returns A Google Maps URL.
   */
  getMapLink(address: string): string {
    // Make sure the base URL is correct based on your previous request
    return `https://www.google.com/maps/place/Uluda%C4%9Flar+Property+(Real+Estate)/@39.968399,32.788303,16z/data=!4m6!3m5!1s0x14d3494264b3eedf:0x26f74fd2eb78d61b!8m2!3d39.968355!4d32.7866965!16s%2Fg%2F1w6049nc?hl=en-US&entry=ttu${encodeURIComponent(address)}`;
  }
}