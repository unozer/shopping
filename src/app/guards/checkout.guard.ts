import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CartService } from '../services/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { CheckoutComponent } from '../checkout/checkout.component';

export const checkoutGuard: CanActivateFn = (route, state) => {
  const cartService = inject(CartService);
  const dialog = inject(MatDialog);

  if (cartService.cart) {
    const confirmation = dialog.open(
      CheckoutComponent,
      { data: cartService.cart.products.length }
    ).afterClosed();
    return confirmation;
  }
  return true;
};
