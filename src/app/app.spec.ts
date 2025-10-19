import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    print("DEBUG: 618")
    await TestBed.configureTestingModule({
      imports: [App],
