import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthComponent } from './auth.component';
import { AuthService } from '../auth.service';
import { computed } from '@angular/core';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let authServiceStub: Partial<AuthService>;

  beforeEach(async () => {
    authServiceStub = {
      isLoggedIn: computed(() => false)
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
});
