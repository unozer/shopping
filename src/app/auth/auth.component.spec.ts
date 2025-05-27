import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthComponent } from './auth.component';
import { AuthService } from '../services/auth.service';
import { computed, Signal } from '@angular/core';
import { of } from 'rxjs';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let authServiceStub: Partial<AuthService>;

  beforeEach(async () => {
    authServiceStub = {
      isLoggedIn: computed(() => false),
      login: jasmine.createSpy('login').and.returnValue(of({})),
      logout: jasmine.createSpy('logout')
    };

    await TestBed.configureTestingModule({
      imports: [AuthComponent],
      providers: [
        { provide: AuthService, useValue: authServiceStub }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.login when login is called', () => {
    component.login();
    expect(authServiceStub.login).toHaveBeenCalledWith('johnd', 'm38rmF$');
  });

  it('should call authService.logout when logout is called', () => {
    component.logout();
    expect(authServiceStub.logout).toHaveBeenCalled();
  });

  it('should show login button when not logged in', () => {
    (authServiceStub.isLoggedIn as any) = () => false;
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.textContent).toContain('Login');
  });

  it('should show logout button when logged in', () => {
    (authServiceStub.isLoggedIn as any) = () => true;
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.textContent).toContain('Logout');
  });
});
