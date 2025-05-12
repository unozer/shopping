import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { APP_SETTINGS, appSettings } from './app.settings';

import { routes } from './app.routes';
import { authInterceptor } from './auth.interceptor';
import { AppErrorHandler } from './app-error-handler';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()), 
    provideHttpClient(withInterceptors([authInterceptor])),
    { provide: APP_SETTINGS, useValue: appSettings },
    { provide: ErrorHandler, useClass: AppErrorHandler },
  ],
};
