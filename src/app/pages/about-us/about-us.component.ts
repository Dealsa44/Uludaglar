// src/app/about-us/about-us.component.ts
import { Component, OnInit } from '@angular/core';
import { aboutUsMocks } from '../../core/mocks/about-us.mocks';
import { blogMocks } from '../../core/mocks/blogmocks'; // Make sure this path is correct
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
  // Limit to the first 4 blog posts
  blogData = { ...blogMocks, posts: blogMocks.posts.slice(0, 4) }; // Use spread to keep other blogMocks properties if any
  currentLanguageIndex = 0;
  contactForm: FormGroup;
  joinTeamForm: FormGroup;
  selectedFile: File | null = null;

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

  // New method to get the first paragraph of content text
  getFirstContentText(content: any[]): string {
    if (content && content.length > 0 && content[0].text && content[0].text.length > 0) {
      return this.getTranslatedText(content[0].text[0]); // Get the first text item of the first content block
    }
    return ''; // Return empty string if no content is found
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
}