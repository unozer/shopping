import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ProductsService } from './products.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), ProductsService]
};
