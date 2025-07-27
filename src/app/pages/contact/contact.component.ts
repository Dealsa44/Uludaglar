import { Component, OnInit } from '@angular/core';
import { contactMocks } from '../../core/mocks/contactmocks';
import { LanguageService } from '../../core/services/language.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from '../../core/pipes/safe-url.pipe';
import { EmailService } from '../../core/services/email.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SafeUrlPipe],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactData = contactMocks;
  currentLanguageIndex = 0; // This will be updated by LanguageService
  contactForm: FormGroup;

  constructor(
    private languageService: LanguageService,
    private fb: FormBuilder,
    private emailService: EmailService, // Inject EmailService
    private notificationService: NotificationService // Inject NotificationService
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''], // Phone is not required per your mocks
      message: ['', Validators.required],
      kvkk: [false, Validators.requiredTrue] // KVKK must be true
    });
  }

  ngOnInit(): void {
    // This part correctly subscribes to language changes
    this.languageService.currentLanguage$.subscribe(index => {
      this.currentLanguageIndex = index;
    });
  }

  // Use the existing getTranslatedText from your component, which calls LanguageService
  getTranslatedText(text: string | string[]): string {
    return this.languageService.getTranslatedText(text);
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const formData = {
        formType: 'contactUs', // Define the form type for the backend
        name: this.contactForm.value.name,
        surname: this.contactForm.value.surname,
        email: this.contactForm.value.email,
        phone: this.contactForm.value.phone,
        message: this.contactForm.value.message,
        kvkk: this.contactForm.value.kvkk // Send KVKK boolean
      };

      this.emailService.sendEmail(formData).subscribe({
        next: (response) => {
          console.log('Email sent successfully:', response);
          this.notificationService.showNotification(
            ['Mesajınız başarıyla gönderildi!', 'Your message has been sent successfully!'],
            'success'
          );
          this.contactForm.reset(); // Clear form fields
          // Manually reset KVKK to false, as reset() might not handle requiredTrue well
          this.contactForm.get('kvkk')?.setValue(false);
          this.contactForm.get('kvkk')?.markAsUntouched();
          this.contactForm.get('kvkk')?.markAsPristine();
        },
        error: (error) => {
          console.error('Error sending email:', error);
          this.notificationService.showNotification(
            ['Mesajınız gönderilemedi. Lütfen daha sonra tekrar deneyin.', 'Failed to send your message. Please try again later.'],
            'error'
          );
        }
      });
    } else {
      this.contactForm.markAllAsTouched(); // Mark all fields as touched to show errors
      this.notificationService.showNotification(
        ['Lütfen tüm gerekli alanları doğru şekilde doldurun.', 'Please fill in all required fields correctly.'],
        'error'
      );
    }
  }
}