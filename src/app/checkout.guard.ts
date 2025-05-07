import { CanActivateFn } from '@angular/router';

export const checkoutGuard: CanActivateFn = (route, state) => {
  const confirmation = confirm(
    'You have pending items in your cart. Do you want to continue?');
  return confirmation;
};
