import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpHandlerFn, HttpErrorResponse, HttpStatusCode, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { authInterceptor } from './auth.interceptor';
import { AuthService } from '../services/auth.service';

describe('authInterceptor', () => {
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  const makeRequest = (status?: number) => {
    const req = new HttpRequest('GET', '/test');

    const next: HttpHandlerFn = jasmine.createSpy('next').and.callFake((request) => {
      if (status) {
        return throwError(() => new HttpErrorResponse({ status }));
      }
      return of(new HttpResponse({ status: 200, body: {} })) as Observable<HttpEvent<unknown>>;
    });

    return { req, next };
  };

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['logout']);
    TestBed.configureTestingModule({
      providers: [{ provide: AuthService, useValue: authServiceSpy }]
    });
  });

  it('should be created', () => {
    const interceptor = (req: any, next: any) =>
      TestBed.runInInjectionContext(() => authInterceptor(req, next));
    expect(interceptor).toBeTruthy();
  });

  it('should add Authorization header', (done) => {
    const { req, next } = makeRequest();
    TestBed.runInInjectionContext(() => {
      authInterceptor(req, (request) => {
        expect(request.headers.get('Authorization')).toBe('myToken');
        return next(request);
      }).subscribe(() => done());
    });
  });

  it('should call logout on 401 error', (done) => {
    const { req, next } = makeRequest(HttpStatusCode.Unauthorized);
    TestBed.runInInjectionContext(() => {
      authInterceptor(req, next).subscribe({
        complete: () => {
          expect(authServiceSpy.logout).toHaveBeenCalled();
          done();
        }
      });
    });
  });

  it('should propagate non-401 errors', (done) => {
    const { req, next } = makeRequest(HttpStatusCode.Forbidden);
    TestBed.runInInjectionContext(() => {
      authInterceptor(req, next).subscribe({
        error: (err) => {
          expect(authServiceSpy.logout).not.toHaveBeenCalled();
          expect(err.status).toBe(HttpStatusCode.Forbidden);
          done();
        }
      });
    });
  });
});
