import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QueueService } from './queue'; // Імпорт з вашого файлу queue.ts
import { QueueData, Lang, Theme } from './models';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule], // Підключаємо модулі тут
  templateUrl: './app.html',
  styleUrrl: './app.scss'
})
export class AppComponent implements OnInit {
  queues$: Observable<QueueData[]>;
  status$: Observable<string>;
  currentLang$: Observable<Lang>;
  t$: Observable<any>;

  isSettingsOpen = false;
  visibleQueueIds: string[] = [];
  allQueueIds: string[] = []
  tempVisibleIds: Set<string> = new Set();
  tempTheme: Theme = 'light';
  tempLang: Lang = 'ua';

  constructor(public qService: QueueService) {
    this.status$ = this.qService.status$;
    this.currentLang$ = this.qService.lang$;

