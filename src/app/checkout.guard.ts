import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CartService } from './cart.service';

export const checkoutGuard: CanActivateFn = (route, state) => {
  const cartService = inject(CartService);
  if (cartService.cart) {
    const confirmation = confirm(
      'You have pending items in your cart. Do you want to continue?');
    return confirmation;
  }
  return true;
};
