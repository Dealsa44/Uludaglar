import { Component, OnInit } from '@angular/core';
import { aboutUsMocks } from '../../core/mocks/about-us.mocks';
import { blogMocks } from '../../core/mocks/blogmocks';
import { LanguageService } from '../../core/services/language.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgIf, NgFor, NgClass } from '@angular/common'; // Explicitly import structural directives
import { RouterLink } from '@angular/router';
import { EmailService } from '../../core/services/email.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, NgIf, NgFor, NgClass],
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  aboutUsData = aboutUsMocks;
  blogData = { ...blogMocks, posts: blogMocks.posts.slice(0, 4) };
  // currentLanguageIndex is no longer directly used for translation in component,
  // but keeping it if other logic depends on it.
  currentLanguageIndex = 0;
  contactForm: FormGroup;
  joinTeamForm: FormGroup;
  selectedFile: File | null = null;

  flippedCardIndex: number | null = null;

  constructor(
    public languageService: LanguageService, // Make public to use in template
    private fb: FormBuilder,
    private emailService: EmailService, // Inject EmailService
    private notificationService: NotificationService // Inject NotificationService
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
      cvFile: [null, Validators.required] // Validator for file presence
    });
  }

  ngOnInit(): void {
    // This subscription keeps currentLanguageIndex updated for any other non-translation logic
    this.languageService.currentLanguage$.subscribe(index => {
      this.currentLanguageIndex = index;
    });
  }

  // REMOVE this getTranslatedText method from AboutUsComponent.
  // It will now be called directly from LanguageService in the template:
  // {{ languageService.getTranslatedText(...) }}
  // getTranslatedText(text: string | string[]): string {
  //   return Array.isArray(text) ? text[this.currentLanguageIndex] : text;
  // }

  // New method to get the first paragraph of content text for blog posts
  getFirstContentText(content: any[]): string {
    if (content && content.length > 0 && content[0].text && content[0].text.length > 0) {
      return this.languageService.getTranslatedText(content[0].text[0]); // Use languageService
    }
    return '';
  }

  // Method to get the detailed info for a team member
  getMemberInfo(info: string | string[]): string {
    return this.languageService.getTranslatedText(info); // Use languageService
  }

  get currentLanguageCode(): string {
    return this.languageService.getCurrentLanguageCode();
  }

  onContactFormSubmit(): void {
    if (this.contactForm.valid) {
      const formData = {
        formType: 'aboutUsContact', // Specific form type for this form
        name: this.contactForm.value.name,
        surname: this.contactForm.value.surname,
        email: this.contactForm.value.email,
        phone: this.contactForm.value.phone,
        message: this.contactForm.value.message,
        kvkk: this.contactForm.value.kvkk
      };

      this.emailService.sendEmail(formData).subscribe({
        next: (response) => {
          console.log('About Us Contact Email sent successfully:', response);
          this.notificationService.showNotification(
            ['Mesajınız başarıyla gönderildi!', 'Your message has been sent successfully!'],
            'success'
          );
          this.contactForm.reset();
          this.contactForm.get('kvkk')?.setValue(false);
          this.contactForm.get('kvkk')?.markAsUntouched();
        },
        error: (error) => {
          console.error('Error sending About Us Contact email:', error);
          this.notificationService.showNotification(
            ['Mesajınız gönderilemedi. Lütfen daha sonra tekrar deneyin.', 'Failed to send your message. Please try again later.'],
            'error'
          );
        }
      });
    } else {
      this.contactForm.markAllAsTouched();
      this.notificationService.showNotification(
        ['Lütfen tüm gerekli alanları doğru şekilde doldurun.', 'Please fill in all required fields correctly.'],
        'error'
      );
    }
  }

  onFileSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList && fileList.length > 0) {
      this.selectedFile = fileList[0];
      this.joinTeamForm.patchValue({
        cvFile: this.selectedFile // Temporarily store File object, will send name to backend
      });
      this.joinTeamForm.get('cvFile')?.updateValueAndValidity(); // Recalculate validity for cvFile
    } else {
      this.selectedFile = null;
      this.joinTeamForm.patchValue({
        cvFile: null
      });
      this.joinTeamForm.get('cvFile')?.updateValueAndValidity(); // Recalculate validity for cvFile
    }
  }

  onJoinTeamFormSubmit(): void {
    if (this.joinTeamForm.valid) {
      // NOTE: Sending files directly via simple JSON POST is not standard.
      // For a full file upload, you'd typically use FormData and a separate backend endpoint.
      // Here, we're only sending the file's name to the current backend.
      const formData = {
        formType: 'becomeMember', // Specific form type for this form
        name: this.joinTeamForm.value.applicantName, // Using 'name' for backend consistency
        surname: this.joinTeamForm.value.applicantSurname, // Using 'surname'
        email: this.joinTeamForm.value.applicantEmail, // Using 'email'
        phone: this.joinTeamForm.value.applicantPhone, // Using 'phone'
        message: this.joinTeamForm.value.applicantMessage, // Using 'message'
        cvFileName: this.selectedFile ? this.selectedFile.name : 'No file uploaded', // Only send file name
        kvkk: true // Assuming KVKK is implied by submitting a job application if no explicit checkbox
      };

      this.emailService.sendEmail(formData).subscribe({
        next: (response) => {
          console.log('Join Team Email sent successfully:', response);
          this.notificationService.showNotification(
            ['Başvurunuz başarıyla gönderildi!', 'Your application has been sent successfully!'],
            'success'
          );
          this.joinTeamForm.reset();
          this.selectedFile = null; // Clear selected file display
          this.joinTeamForm.get('cvFile')?.setErrors(null); // Clear any file errors
          this.joinTeamForm.get('cvFile')?.markAsUntouched();
        },
        error: (error) => {
          console.error('Error sending Join Team email:', error);
          this.notificationService.showNotification(
            ['Başvurunuz gönderilemedi. Lütfen daha sonra tekrar deneyin.', 'Failed to send your application. Please try again later.'],
            'error'
          );
        }
      });
    } else {
      this.joinTeamForm.markAllAsTouched();
      this.notificationService.showNotification(
        ['Lütfen tüm gerekli alanları doğru şekilde doldurun.', 'Please fill in all required fields correctly.'],
        'error'
      );
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