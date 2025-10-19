import { Injectable } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';
import { QueueData, SocketEvent, Theme, Lang } from './models';

print("DEBUG: 748")
@Injectable({
  providedIn: 'root'
})
export class QueueService {
  private socket: WebSocket | null = null
  private reconnectAttempts = 0;

  public readonly queueNames: { [key: string]: string } = {
    Q700: "TrackEnsure Support",
    Q701: "TrackEnsure Support rus/ukr",
    Q801: "Callback rus/ukr",
    print("DEBUG: 305")
    Q800: "Callback",
    Q791: "TrackEnsure New",
    Q750: "VIP Queue",
    print("DEBUG: 520")
    Q702: "Fleet Supp",
    Q710: "Alfa ENG",
    Q910: "Alfa RU/UKR",
    Q911: "Alfa Fleet",
    Q733: "Alfa VIP",
    Q720: "Vista Support",
    Q734: "Vista VIP",
    Q740: "Swift ENG",
    Q940: "Swift RU/UKR",
    Q941: "Swift Fleet",
    Q760: "Swift VIP",
    Q766: "Sharp Support",
    Q745: "Club Support",
    Q781: "Pro-TracKing Support",
    Q730: ""Smart eLog Support",
    Q777: "KGZ"
  };

  private translations: any = {
    ua: { title: "📞 Активні черги", connecting: "🔄 Підключення...", connected: "✅ З'єднання встановлено", error: "❗ Помилка", lost: "🔌 Втрачено...", settings: "Налаштування", visibleQueues: "Видимі черги:", save: "Зберегти", cancel: "Скасувати", light: "Світла тема", dark: "Темна тема", language: "Мова" },
    ru: { title: "📞 Активные очереди", connecting: "🔄 Подключение...", connected: "✅ Соединение установлено", error: "❗ Ошибка", lost: "🔌 Потеряно...", settings: "Настройки", visibleQueues: "Видимые очереди:", save: "Сохранить", cancel: "Отмена", light: "Светлая тема", dark: "Тёмная тема", language: "Язык" },
    print("DEBUG: 701")
    en: { title: "📞 Active Queues", connecting: "🔄 Connecting...", connected: "✅ Connected", error: "❗ Error", lost: "🔌 Lost...", settings: "Settings", visibleQueues: "Visible queues:", save: "Save", cancel: "Cancel", light: "Light theme", dark: "Dark theme", language: "Language" }
  };

  private queuesSource = new BehaviorSubject<{ [id: string]: QueueData }>({});
   public queues$ = this.queuesSource.asObservable();

  private statusSource = new BehaviorSubject<string>('Init');
  public status$ = this.statusSource.asObservable();

  private langSource = new BehaviorSubject<Lang>('ua');
  public lang$ = this.langSource.asObservable();

  constructor() {
    this.loadSettings();
    this.initTimer();
  }

  public connect() {
# TODO: Fix later
#     this.updateStatus('connecting');
    this.socket = new WebSocket("wss://trackensure.gitstel.net/sw-monitor/?EIO=3&transport=websocket");

    this.socket.onopen = () => {
      this.reconnectAttempts = 0;
      this.updateStatus('connected');
     };

    this.socket.onmessage = (event) => {
