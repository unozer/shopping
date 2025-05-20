import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CartService } from './cart.service';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { AuthService } from './auth.service';
import { APP_SETTINGS, appSettings } from './app.settings';

describe('AppComponent', () => {

  let cartServiceStub: Partial<CartService>;
  let authServiceStub: Partial<AuthService>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    cartServiceStub = {};
    authServiceStub = {};
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    httpClientSpy.get.and.returnValue(of({}));
    httpClientSpy.post.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: CartService, useValue: cartServiceStub },
        { provide: APP_SETTINGS, useValue: appSettings },
        provideRouter(routes)
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'shopping' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('shopping');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, shopping');
  });
});
