import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { checkoutGuard } from './checkout.guard';
import { CartService } from '../services/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';

describe('checkoutGuard', () => {
  let cartServiceMock: any;
  let matDialogMock: any;

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => checkoutGuard(...guardParameters));

  beforeEach(() => {
    cartServiceMock = {
      cart: null
    };
    matDialogMock = {
      open: jasmine.createSpy('open').and.returnValue({
        afterClosed: () => of(true)
      })
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: CartService, useValue: cartServiceMock },
        { provide: MatDialog, useValue: matDialogMock }
      ]
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should return true if cart is null', (done) => {
    cartServiceMock.cart = null;
    const result = executeGuard({} as any, {} as any);
    if (typeof (result as any).subscribe === 'function') {
      (result as any).subscribe((value: any) => {
        expect(value).toBeTrue();
        done();
      });
    } else {
      expect(result).toBeTrue();
      done();
    }
  });

  it('should open dialog and return its afterClosed value if cart exists', (done) => {
    cartServiceMock.cart = { products: [1, 2, 3] };
    matDialogMock.open.and.returnValue({
      afterClosed: () => of('dialogResult')
    });
    const result = executeGuard({} as any, {} as any);
    expect(matDialogMock.open).toHaveBeenCalled();
    expect(matDialogMock.open.calls.mostRecent().args[1].data).toBe(3);
    (result as any).subscribe((value: any) => {
      expect(value).toBe('dialogResult');
      done();
    });
  });

  it('should pass correct product count to dialog data', (done) => {
    cartServiceMock.cart = { products: [1, 2] };
    matDialogMock.open.and.returnValue({
      afterClosed: () => of(true)
    });
    const result = executeGuard({} as any, {} as any);
    expect(matDialogMock.open).toHaveBeenCalledWith(jasmine.any(Function), { data: 2 });
    (result as any).subscribe(() => done());
  });
});
