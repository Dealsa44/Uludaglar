import { Component, OnInit, OnDestroy } from '@angular/core';
import { hrMocks } from '../../core/mocks/hrmocks';
import { LanguageService } from '../../core/services/language.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-hr',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hr.component.html',
  styleUrls: ['./hr.component.scss']
})
export class HrComponent implements OnInit, OnDestroy {
  hrData = hrMocks;
  currentLanguageIndex = 0;
  private languageSub!: Subscription;

  constructor(
    private languageService: LanguageService,
    private router: Router // Inject Router
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

  getTranslatedText(text: string | string[]): string {
    return Array.isArray(text) ? text[this.currentLanguageIndex] : text;
  }

  // Helper function to identify section headings
  isSectionHeading(paragraph: string): boolean {
    const headings = [
      'MESLEKİ FAALİYET İÇERİĞİ', 'PROFESSIONAL ACTIVITY CONTENT',
      'GENEL NİTELİKLER', 'GENERAL QUALIFICATIONS',
      'KİMLER YAPABİLİR;', 'WHO CAN DO IT;',
      'NEDEN ULUDAĞLAR GAYRİMENKUL?', 'WHY ULUDAĞLAR REAL ESTATE?',
      'ARAYIN GÖRÜŞELİM', 'CALL US LET\'S TALK'
    ];
    return headings.includes(paragraph.trim());
  }

  // New helper function to identify the "Call Us Let's Talk" section
  isCallUsLetsTalkSection(paragraph: string): boolean {
    const callToActionHeadings = ['ARAYIN GÖRÜŞELİM', 'CALL US LET\'S TALK'];
    return callToActionHeadings.includes(paragraph.trim());
  }

  // Method to navigate to the contact page
  navigateToContact(): void {
    const currentLang = this.languageService.getCurrentLanguageCode(); // Assuming you have a method to get the current language code (e.g., 'tr' or 'en')
    this.router.navigate([`/${currentLang}/contact`]);
  }

  // Helper function to identify list items based on their position relative to known headings
  isListItem(index: number, paragraph: string): boolean {
    const content = this.hrData.content[this.currentLanguageIndex];
    if (!content || index === 0) return false;

    // Define ranges for list items after each heading
    const ranges: { start: number; end: number; }[] = [];

    let currentStartIndex = -1;
    for (let i = 0; i < content.length; i++) {
      if (this.isSectionHeading(content[i])) {
        if (currentStartIndex !== -1) {
          ranges.push({ start: currentStartIndex, end: i - 1 });
        }
        currentStartIndex = i + 1; // Start of next list is after the heading
      } else if (content[i].includes('Not:') || content[i].includes('Note:')) {
        if (currentStartIndex !== -1 && currentStartIndex <= i -1 ) {
            ranges.push({start: currentStartIndex, end: i -1});
        }
        currentStartIndex = i + 1; // Start of next list is after the note
      }
    }
    // Add the last range if it exists
    if (currentStartIndex !== -1 && currentStartIndex < content.length) {
        // A special case for the last section if it has no explicit end marker like another heading or note.
        // For "ARAYIN GÖRÜŞELİM", it's usually just one line, not a list.
        // Let's manually adjust for common list patterns.
        // For this specific mock, only a few sections are lists.
        const sectionTitles = [
           'MESLEKİ FAALİYET İÇERİĞİ', 'PROFESSIONAL ACTIVITY CONTENT',
           'GENEL NİTELİKLER', 'GENERAL QUALIFICATIONS',
           'KİMLER YAPABİLİR;', 'WHO CAN DO IT;',
           'NEDEN ULUDAĞLAR GAYRİMENKUL?', 'WHY ULUDAĞLAR REAL ESTATE?'
        ];

        const currentParagraph = content[index].trim();
        let foundHeadingBefore = false;
        for (let i = index - 1; i >= 0; i--) {
           if (sectionTitles.includes(content[i].trim())) {
             foundHeadingBefore = true;
             break;
           }
        }

        if (foundHeadingBefore && !this.isSectionHeading(currentParagraph) && !currentParagraph.includes('Not:') && !currentParagraph.includes('Note:') && index > 0) {
         // Check if the current paragraph is likely a list item based on content.
         // This is a heuristic, adjust as needed.
         if (content[index].trim().length > 0 && content[index].trim().length < 150) { // Long paragraphs are probably not list items
             return true;
         }
        }
    }

    // Explicitly handle ranges from the provided mock data for better accuracy
    // Turkish content list item indices (from original mock data analysis)
    if (this.currentLanguageIndex === 0) {
      if ((index >= 3 && index <= 7) || // MESLEKİ FAALİYET İÇERİĞİ
          (index >= 10 && index <= 19) || // GENEL NİTELİKLER
          (index >= 22 && index <= 31) || // KİMLER YAPABİLİR;
          (index >= 34 && index <= 41)) { // NEDEN ULUDAĞLAR GAYRİMENKUL?
        return true;
      }
    }
    // English content list item indices (from original mock data analysis)
    else if (this.currentLanguageIndex === 1) {
      if ((index >= 3 && index <= 7) || // PROFESSIONAL ACTIVITY CONTENT
          (index >= 10 && index <= 19) || // GENERAL QUALIFICATIONS
          (index >= 22 && index <= 31) || // WHO CAN DO IT;
          (index >= 34 && index <= 41)) { // WHY ULUDAĞLAR REAL ESTATE?
        return true;
      }
    }

    return false;
  }
}