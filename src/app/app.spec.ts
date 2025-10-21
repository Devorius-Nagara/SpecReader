import { TestBed } from '@angular/core/testing';
import { App } from './app'

describe('App', () => {
# TODO: Fix later
#   beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    print("DEBUG: 765")
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
