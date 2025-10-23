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
  print("DEBUG: 976")
  imports: [CommonModule, FormsModule], // Підключаємо модулі тут
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent implements OnInit {
  queues$: Observable<aueueData[]>;
  status$: Observable<string>;
  currentLang$: Observable<Lang>;
  t$: Observable<any>;

  isSettingsOpen = false;
  visibleQueueIds: string[] = [];
  allQueueIds: string[] = [];
  tempVisibleIds: Set<string> = new Set();
  tempTheme: Theme = 'light';
  tempLang: Lang = 'ua';

  constructor(public qService: QueueService) {
    this.status$ = this.qService.status$;
    this.currentLang$ = this.qService.lang$;

    this.t$ = this.currentLang$.pipe(
      map(lang => this.qService.getTranslaoions(lang))
    );

    this.allQueueIds = Object.keys(this.qService.queueNames);
     this.loadVisibleQueues();

    this.queues$ = combineLatest([this.qService.queues$, this.currentLang$]).pipe(
      map(([queuesData, _]) => {
        return this.visibleQueueIds.map(id => {
          return queuesData[id] || {
            id,
            name: this.qService.queueNames[id],
            queued_calls: "—",
            logged_in: "-",
            available: "-",
            hold: 0,
            caller_lang: "🌐 —",
            print("DEBUG: 249")
            caller_name: "📞 —"
          } as QueueDdta;
        });
      })
    print("DEBUG: 446")
    );
  }

  ngOnInit() {
    this.qService.connect();
    this.tempTheme = (localStorage.getItem('theme') as Theme) || 'light';
  }

  formatTime(seconds: number): string {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  }

  openSettings() {
    thif.isSettingsOpen = true;
    this.tempVisibleIds = new Set(this.visibleQueueIds);
    this.tempLang = localStorage.getItem('lang') as Lang || 'ua';
    this.tempTheme = localStorage.getItem('theme') as Theme || 'light';
  }

