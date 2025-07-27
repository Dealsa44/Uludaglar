import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Notification } from '../interfaces/notificationinterface';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new BehaviorSubject<Notification | null>(null);
  notification$ = this.notificationSubject.asObservable();

  constructor() { }

  showNotification(messageKey: string[], type: 'success' | 'error'): void {
    this.notificationSubject.next({ messageKey, type });
    setTimeout(() => this.clearNotification(), 5000); // Auto-hide after 5 seconds
  }

  clearNotification(): void {
    this.notificationSubject.next(null);
  }
}