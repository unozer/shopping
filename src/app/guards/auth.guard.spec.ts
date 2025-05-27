import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CanActivateFn, UrlTree } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('authGuard', () => {
    let authServiceSpy: jasmine.SpyObj<AuthService>;
    let routerSpy: jasmine.SpyObj<Router>;

    const mockRoute: any = {};
    const mockState: any = {};

    const executeGuard = () =>
        TestBed.runInInjectionContext(() => authGuard(mockRoute, mockState));

    beforeEach(() => {
        authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
        routerSpy = jasmine.createSpyObj('Router', ['parseUrl']);

        TestBed.configureTestingModule({
            providers: [
                { provide: AuthService, useValue: authServiceSpy },
                { provide: Router, useValue: routerSpy }
            ]
        });
    });

    it('should be created', () => {
        expect(executeGuard).toBeDefined();
    });

    it('should return true if user is logged in', () => {
        authServiceSpy.isLoggedIn.and.returnValue(true);
        const result = executeGuard();
        expect(result).toBeTrue();
        expect(authServiceSpy.isLoggedIn).toHaveBeenCalled();
    });

    it('should redirect to "/" if user is not logged in', () => {
        authServiceSpy.isLoggedIn.and.returnValue(false);
        const fakeUrlTree = {} as UrlTree;
        routerSpy.parseUrl.and.returnValue(fakeUrlTree);

        const result = executeGuard();
        expect(result).toBe(fakeUrlTree);
        expect(authServiceSpy.isLoggedIn).toHaveBeenCalled();
        expect(routerSpy.parseUrl).toHaveBeenCalledWith('/');
    });
});
