import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Loading } from '../../services/loading/loading';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(Loading);

  loadingService.show(); // increment counter

  return next(req).pipe(
    finalize(() => loadingService.hide()), // decrement on complete OR error
  );
};
