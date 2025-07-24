import { Component, OnInit } from '@angular/core';
import { contactMocks } from '../../core/mocks/contactmocks';
import { LanguageService } from '../../core/services/language.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from '../../core/pipes/safe-url.pipe';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SafeUrlPipe],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactData = contactMocks;
  currentLanguageIndex = 0;
  contactForm: FormGroup;

  constructor(
    private languageService: LanguageService,
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

  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Form Data:', {
        name: this.contactForm.value.name,
        surname: this.contactForm.value.surname,
        email: this.contactForm.value.email,
        phone: this.contactForm.value.phone,
        message: this.contactForm.value.message
      });
      this.contactForm.reset();
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}