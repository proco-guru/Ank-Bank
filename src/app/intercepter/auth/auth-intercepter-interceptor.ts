import { HttpInterceptorFn } from '@angular/common/http';

export const authIntercepter: HttpInterceptorFn = (req, next) => {
  // 1. Get the token from localStorage (Day 10 pattern)
  const token = localStorage.getItem('authToken');

  // 2. If no token, pass request through unchanged
  if (!token) {
    return next(req);
  }
  // 3. Clone the request and add the Authorization header
  // CRITICAL — HttpRequest is IMMUTABLE. Must CLONE to modify.
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  // 4. Pass the CLONED (modified) request to the next handler
  return next(authReq);
};
