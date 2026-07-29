import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const isCustLogin = localStorage.getItem('isCustLogin');
  if (isCustLogin === 'true') {
    return true;
  }
  // Redirect using UrlTree so the router correctly handles navigation
  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url }, // Useful to redirect back after login
  });
};
