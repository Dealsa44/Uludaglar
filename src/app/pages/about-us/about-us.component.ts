import { Component, OnInit } from '@angular/core';
import { aboutUsMocks } from '../../core/mocks/about-us.mocks';
import { blogMocks } from '../../core/mocks/blogmocks';
import { LanguageService } from '../../core/services/language.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EmailService } from '../../core/services/email.service';
import { NotificationService } from '../../core/services/notification.service';

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

  flippedCardIndex: number | null = null;

  constructor(
    public languageService: LanguageService,
    private fb: FormBuilder,
    private emailService: EmailService,
    private notificationService: NotificationService
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
    this.languageService.currentLanguage$.subscribe(index => {
      this.currentLanguageIndex = index;
    });
  }

  getFirstContentText(content: any[]): string {
    if (content && content.length > 0 && content[0].text && content[0].text.length > 0) {
      return this.languageService.getTranslatedText(content[0].text[0]);
    }
    return '';
  }

  getMemberInfo(info: string | string[]): string {
    return this.languageService.getTranslatedText(info);
  }

  get currentLanguageCode(): string {
    return this.languageService.getCurrentLanguageCode();
  }

  onContactFormSubmit(): void {
    if (this.contactForm.valid) {
      const formData = {
        formType: 'aboutUsContact',
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
        cvFile: this.selectedFile // Store the File object
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
    if (this.joinTeamForm.valid && this.selectedFile) {
      // Create a FormData object to send both text fields and the file
      const formData = new FormData();
      formData.append('formType', 'becomeMember');
      formData.append('name', this.joinTeamForm.value.applicantName);
      formData.append('surname', this.joinTeamForm.value.applicantSurname);
      formData.append('email', this.joinTeamForm.value.applicantEmail);
      formData.append('phone', this.joinTeamForm.value.applicantPhone || ''); // Phone might be optional
      formData.append('message', this.joinTeamForm.value.applicantMessage || ''); // Message might be optional
      formData.append('cvFile', this.selectedFile, this.selectedFile.name); // Append the file with its name

      // Assuming KVKK is implicitly true for a job application form if not explicitly a checkbox
      // If you need an explicit KVKK checkbox here, add it to your form and append its value
      formData.append('kvkk', 'true'); // Sending as string 'true' for Flask backend

      this.emailService.sendEmail(formData).subscribe({
        next: (response) => {
          console.log('Join Team Email with file sent successfully:', response);
          this.notificationService.showNotification(
            ['Başvurunuz başarıyla gönderildi!', 'Your application has been sent successfully!'],
            'success'
          );
          this.joinTeamForm.reset();
          this.selectedFile = null;
          this.joinTeamForm.get('cvFile')?.setErrors(null);
          this.joinTeamForm.get('cvFile')?.markAsUntouched();
        },
        error: (error) => {
          console.error('Error sending Join Team email with file:', error);
          this.notificationService.showNotification(
            ['Başvurunuz gönderilemedi. Lütfen daha sonra tekrar deneyin.', 'Failed to send your application. Please try again later.'],
            'error'
          );
        }
      });
    } else {
      this.joinTeamForm.markAllAsTouched();
      this.notificationService.showNotification(
        ['Lütfen tüm gerekli alanları doğru şekilde doldurun ve bir CV yükleyin.', 'Please fill in all required fields correctly and upload a CV.'],
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