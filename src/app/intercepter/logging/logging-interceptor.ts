import { HttpInterceptorFn } from '@angular/common/http';
import { finalize, tap } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const startTime = Date.now();
  console.log(`[HTTP] ${req.method} ${req.url} — started`);

  return next(req).pipe(
    tap({
      next: (event) => {
        // HttpResponse is one specific type of HttpEvent
        // Import HttpResponse if you need to inspect the body
        console.log(`[HTTP] Response received for ${req.url}`);
      },
      error: (error) => {
        console.error(`[HTTP] Error for ${req.url}:`, error.status, error.message);
      },
    }),
    finalize(() => {
      // finalize runs whether success OR error — perfect for timing
      const duration = Date.now() - startTime;
      console.log(`[HTTP] ${req.method} ${req.url} — completed in ${duration}ms`);
    }),
  );
};
