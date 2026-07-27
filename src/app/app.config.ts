import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authIntercepter } from './intercepter/auth/auth-intercepter-interceptor';
import { loggingInterceptor } from './intercepter/logging/logging-interceptor';
import { errorInterceptor } from './intercepter/error/error-interceptor';
import { loadingInterceptor } from './intercepter/loading/loading-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(
      withInterceptors([authIntercepter, loadingInterceptor, loggingInterceptor, errorInterceptor]),
    ),
  ],
};
