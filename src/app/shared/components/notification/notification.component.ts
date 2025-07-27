import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { NotificationService } from '../../../core/services/notification.service';
import { LanguageService } from '../../../core/services/language.service';
import { Notification } from '../../../core/interfaces/notificationinterface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, NgClass, NgIf], // No TranslateModule needed
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {
  currentNotification: Notification | null = null;
  notificationSubscription: Subscription | undefined;

  constructor(
    public notificationService: NotificationService,
    private languageService: LanguageService // Inject your LanguageService
  ) { }

  ngOnInit(): void {
    this.notificationSubscription = this.notificationService.notification$.subscribe(
      notification => {
        this.currentNotification = notification;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.notificationSubscription) {
      this.notificationSubscription.unsubscribe();
    }
  }

  getNotificationClass(): string {
    if (!this.currentNotification) {
      return '';
    }
    return this.currentNotification.type === 'success' ? 'notification-success' : 'notification-error';
  }

  // Use your custom getTranslatedText from LanguageService
  getTranslatedMessage(): string {
    if (this.currentNotification) {
      return this.languageService.getTranslatedText(this.currentNotification.messageKey);
    }
    return '';
  }
}