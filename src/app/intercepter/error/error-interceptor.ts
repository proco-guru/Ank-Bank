import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router); // inject() works inside functional interceptors

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      switch (error.status) {
        case 401:
          // Unauthorized — token expired or invalid
          // Clear session and redirect to login
          console.warn('[HTTP] 401 Unauthorized — redirecting to login');
          localStorage.removeItem('isCustLogin');
          // localStorage.removeItem('authToken');
          router.navigate(['/login']);
          break;

        case 403:
          // Forbidden — user doesn't have permission
          console.warn('[HTTP] 403 Forbidden — insufficient permissions');
          router.navigate(['/unauthorized']); // dedicated "no access" page
          break;

        case 404:
          console.error('[HTTP] 404 Not Found:', req.url);
          break;

        case 500:
          console.error('[HTTP] 500 Server Error — please try again later');
          // In production: show global error toast notification
          break;

        default:
          console.error('[HTTP] Unexpected error:', error.status, error.message);
      }

      // Re-throw the error so individual components can also handle it if needed
      return throwError(() => error);
    }),
  );
};
