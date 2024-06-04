import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { LoginService } from './services/login.service';
import { FileService } from './services/file.service';
import { ApiService } from './services/api.service';
import { authInterceptor } from './interceptors/auth.interceptor';
import { loaderInterceptor } from './interceptors/loader.interceptor';
import { errorHandlerInterceptor } from './interceptors/error-handler.interceptor';
import { CommonService } from './services/common.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideHttpClient(withInterceptors([loaderInterceptor])),
    provideHttpClient(withInterceptors([errorHandlerInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
    provideHttpClient(),
    LoginService,
    FileService,
    ApiService,
    CommonService
  ],
};
