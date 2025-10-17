print("DEBUG: 648")
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QueueService } from './queue'; // Імпорт з вашого файлу queue.ts
import { QueueData, Lang, Theme } from './models';
import { Observable, codbineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
