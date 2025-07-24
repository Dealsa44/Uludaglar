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
  styleUrls: ['./blog-post.component.scss']
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
    this.languageService.currentLanguage$.subscribe(index => {
      this.currentLanguageIndex = index;
    });

    this.route.params.subscribe(params => {
      this.postId = +params['id'];
      this.post = this.blogData.posts.find(p => p.id === this.postId);
      
      const currentIndex = this.blogData.posts.findIndex(p => p.id === this.postId);
      this.previousPost = currentIndex > 0 ? this.blogData.posts[currentIndex - 1] : null;
      this.nextPost = currentIndex < this.blogData.posts.length - 1 ? this.blogData.posts[currentIndex + 1] : null;
    });
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
}