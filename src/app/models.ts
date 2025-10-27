export interface QueueData {
  id: string;
  name: string;
  queued_calls: string | number;
  logged_in: string | number;
  available: string | number;
  hold: number;
  caller_lang?: string;
  caller_name?: string;
  statusClass?: string;
}

export interface SocketEvent {
  queue: string;
  queued_calls: string;
  logged_in_members: string;
  available_members: string;
  longest_hold_time: string;
  position?: string;
  caller_name?: string;
  caller_number?: string;
}

export type Theme = 'light' | 'dark';
export type Lang = 'ua' | 'en';
