// src/app/about-us/about-us.component.ts
import { Component, OnInit } from '@angular/core';
import { aboutUsMocks } from '../../core/mocks/about-us.mocks';
import { blogMocks } from '../../core/mocks/blogmocks';
import { LanguageService } from '../../core/services/language.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  aboutUsData = aboutUsMocks;
  blogData = { ...blogMocks, posts: blogMocks.posts.slice(0, 4) };
  currentLanguageIndex = 0;
  contactForm: FormGroup;
  joinTeamForm: FormGroup;
  selectedFile: File | null = null;

  flippedCardIndex: number | null = null; // To track the flipped team member card

  constructor(
    public languageService: LanguageService,
    private fb: FormBuilder
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      message: ['', Validators.required],
      kvkk: [false, Validators.requiredTrue]
    });

    this.joinTeamForm = this.fb.group({
      applicantName: ['', Validators.required],
      applicantSurname: ['', Validators.required],
      applicantEmail: ['', [Validators.required, Validators.email]],
      applicantPhone: [''],
      applicantMessage: [''],
      cvFile: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.currentLanguageIndex = this.languageService.getCurrentLanguage();
    this.languageService.currentLanguage$.subscribe(index => {
      this.currentLanguageIndex = index;
    });
  }

  getTranslatedText(text: string | string[]): string {
    return Array.isArray(text) ? text[this.currentLanguageIndex] : text;
  }

  // New method to get the first paragraph of content text (re-added for blog posts)
  getFirstContentText(content: any[]): string {
    if (content && content.length > 0 && content[0].text && content[0].text.length > 0) {
      // Assuming the blog post content is structured as an array of objects,
      // where each object has a 'text' property which is an array of strings.
      return this.getTranslatedText(content[0].text[0]);
    }
    return ''; // Return empty string if no content is found
  }

  // Method to get the detailed info for a team member (from your mocks 'info' property)
  getMemberInfo(info: string | string[]): string {
    return this.getTranslatedText(info);
  }

  get currentLanguageCode(): string {
    return this.languageService.getCurrentLanguageCode();
  }

  onContactFormSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Contact Form Data:', {
        name: this.contactForm.value.name,
        surname: this.contactForm.value.surname,
        email: this.contactForm.value.email,
        phone: this.contactForm.value.phone,
        message: this.contactForm.value.message,
        kvkk: this.contactForm.value.kvkk
      });
      this.contactForm.reset();
      this.contactForm.get('kvkk')?.setValue(false);
      this.contactForm.get('kvkk')?.markAsUntouched();
    } else {
      this.contactForm.markAllAsTouched();
    }
  }

  onFileSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList && fileList.length > 0) {
      this.selectedFile = fileList[0];
      this.joinTeamForm.patchValue({
        cvFile: this.selectedFile
      });
      this.joinTeamForm.get('cvFile')?.updateValueAndValidity();
    } else {
      this.selectedFile = null;
      this.joinTeamForm.patchValue({
        cvFile: null
      });
      this.joinTeamForm.get('cvFile')?.updateValueAndValidity();
    }
  }

  onJoinTeamFormSubmit(): void {
    if (this.joinTeamForm.valid) {
      console.log('Join Team Form Data:', {
        applicantName: this.joinTeamForm.value.applicantName,
        applicantSurname: this.joinTeamForm.value.applicantSurname,
        applicantEmail: this.joinTeamForm.value.applicantEmail,
        applicantPhone: this.joinTeamForm.value.applicantPhone,
        applicantMessage: this.joinTeamForm.value.applicantMessage,
        cvFile: this.selectedFile ? this.selectedFile.name : 'No file uploaded'
      });
      this.joinTeamForm.reset();
      this.selectedFile = null;
      this.joinTeamForm.get('cvFile')?.setErrors(null);
    } else {
      this.joinTeamForm.markAllAsTouched();
    }
  }

  toggleCardFlip(index: number): void {
    if (this.flippedCardIndex === index) {
      this.flippedCardIndex = null;
    } else {
      this.flippedCardIndex = index;
    }
  }

  isCardFlipped(index: number): boolean {
    return this.flippedCardIndex === index;
  }
}