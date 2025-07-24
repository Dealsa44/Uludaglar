import { Component, OnInit, OnDestroy } from '@angular/core';
import { visionMissionMocks } from '../../core/mocks/visionmissionmocks';
import { LanguageService } from '../../core/services/language.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vision-mission',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vision-mission.component.html',
  styleUrls: ['./vision-mission.component.scss']
})
export class VisionMissionComponent implements OnInit, OnDestroy {
  vmData = visionMissionMocks;
  currentLanguageIndex = 0;
  private languageSub!: Subscription;

  constructor(private languageService: LanguageService) {}

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
}