import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { APP_SETTINGS, appSettings } from './app.settings';
import { provideHttpClient } from '@angular/common/http';

describe('CartService', () => {
  let service: CartService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: APP_SETTINGS, useValue: appSettings },
      ]
    });
    service = TestBed.inject(CartService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
