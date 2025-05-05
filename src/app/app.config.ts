import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { APP_SETTINGS, appSettings } from './app.settings';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideHttpClient(),
    { provide: APP_SETTINGS, useValue: appSettings },
  ],
};
