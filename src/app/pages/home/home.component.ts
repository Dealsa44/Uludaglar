import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';
import { homeMocks } from '../../core/mocks/homemocks';
import { blogMocks } from '../../core/mocks/blogmocks';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  homeData = homeMocks;
  blogData = blogMocks;
  currentLanguageIndex = 0;
  private languageSub!: Subscription;

  // Slider properties
  currentSlideIndex = 0;
  private sliderInterval: any;

  // Blog section properties
  randomBlogPosts: any[] = [];

  // Founder hover states
  hoveredFounderIndex: number | null = null;

  // YouTube player configuration
  private youtubePlayerParams = {
    rel: 0, // Disable related videos
    modestbranding: 1, // Reduce YouTube logo
    origin: window.location.origin, // Helps with CORS
    enablejsapi: 1, // Enable JS API (for potential future use)
    autoplay: 0, // Disable autoplay to prevent multiple videos playing
    fs: 0, // Disable fullscreen button
    playsinline: 1, // Enable inline playback on iOS
  };
  private videoUrlCache = new Map<string, SafeResourceUrl>();

  constructor(
    private languageService: LanguageService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.currentLanguageIndex = this.languageService.getCurrentLanguage();
    this.languageSub = this.languageService.currentLanguage$.subscribe(
      (index) => (this.currentLanguageIndex = index)
    );

    this.startSlider();
    this.setRandomBlogPosts();
  }

  ngOnDestroy(): void {
    this.languageSub?.unsubscribe();
    this.stopSlider();
  }

  getTranslatedText(text: string | string[]): string {
    return Array.isArray(text) ? text[this.currentLanguageIndex] : text;
  }

  get currentLanguageCode(): string {
    return this.languageService.getCurrentLanguageCode();
  }

  // --- Slider Logic ---
  startSlider(): void {
    this.stopSlider();
    this.sliderInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopSlider(): void {
    if (this.sliderInterval) {
      clearInterval(this.sliderInterval);
    }
  }

  goToSlide(index: number): void {
    this.currentSlideIndex = index;
    this.startSlider();
  }

  nextSlide(): void {
    this.currentSlideIndex =
      (this.currentSlideIndex + 1) % this.homeData.heroSlider.images.length;
  }

  prevSlide(): void {
    this.currentSlideIndex =
      (this.currentSlideIndex - 1 + this.homeData.heroSlider.images.length) %
      this.homeData.heroSlider.images.length;
  }

  navigateToServices(): void {
    this.router.navigate(['/', this.currentLanguageCode, 'services']);
  }

  // --- YouTube Videos ---
  getSafeYouTubeUrl(url: string): SafeResourceUrl {
    if (!this.videoUrlCache.has(url)) {
      const videoId = this.extractYouTubeId(url);
      const params = new URLSearchParams(
        Object.entries({
          ...this.youtubePlayerParams,
          origin: window.location.origin,
        }).reduce((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {} as Record<string, string>)
      ).toString();
      const safeUrl = `https://www.youtube.com/embed/${videoId}?${params}`;
      this.videoUrlCache.set(
        url,
        this.sanitizer.bypassSecurityTrustResourceUrl(safeUrl)
      );
    }
    return this.videoUrlCache.get(url)!;
  }

  private extractYouTubeId(url: string): string {
    const regExp =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : '';
  }

  trackVideo(index: number, videoUrl: string): string {
    return videoUrl; // Use URL as unique identifier
  }

  // --- Blog Section Logic ---
  setRandomBlogPosts(): void {
    const allPosts = [...this.blogData.posts];
    for (let i = allPosts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allPosts[i], allPosts[j]] = [allPosts[j], allPosts[i]];
    }
    this.randomBlogPosts = allPosts.slice(0, 3);
  }

  navigateToBlogPost(postId: number): void {
    this.router.navigate(['/', this.currentLanguageCode, 'blog', postId]);
  }

  getFirstContentText(post: any): string {
    if (post.content && post.content.length > 0 && post.content[0].text) {
      return this.getTranslatedText(post.content[0].text);
    }
    return '';
  }

  navigateToBlogPage(): void {
    this.router.navigate(['/', this.currentLanguageCode, 'blog']);
  }

  // --- Founder Section Hover Logic ---
  onFounderHover(index: number): void {
    this.hoveredFounderIndex = index;
  }

  onFounderLeave(): void {
    this.hoveredFounderIndex = null;
  }
}
