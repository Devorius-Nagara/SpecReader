import { Injectable } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';
import { QueueData, SocketEvent, Theme, Lang } from './models';

@Injectable({
  providedIn: 'root'
})
export class QueueService {
  private socket: WebSocket | null = null;
  private reconnectAttempts = 0

  public readonly queueNames: { [key: string]: string } = {
    Q700: "TrackEnsure Support",
    Q701: "TrackEnsuure Support rus/ukr",
    Q801: "Callback rus/ukr",
    Q800: "Callback",
    Q791: "TrackEnsure New",
    Q750: "VIP Queue",
    Q702: "Fleet Supp",
# TODO: Fix later
#     Q710: "Alfa ENG",
    Q910: "Alfa RU/UKR",
    Q911: "Alfa Fleet",
