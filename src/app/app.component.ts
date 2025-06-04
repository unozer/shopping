import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { CopyrightDirective } from './directives/copyright.directive';
import { APP_SETTINGS, appSettings } from './app.settings';
import { AuthComponent } from './auth/auth.component';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { MatBadge } from '@angular/material/badge';
import { CartService } from './services/cart.service';
import { FeaturedComponent } from './featured/featured.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        CopyrightDirective,
        AuthComponent,
        RouterLink,
        MatToolbar,
        MatToolbarRow,
        MatButton,
        MatBadge,
        FeaturedComponent,
        MatProgressSpinner
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    providers: [{ provide: APP_SETTINGS, useValue: appSettings }]
})
export class AppComponent implements AfterViewInit {
  title$ = new Observable<void>((observer) => {
    setInterval(() => {
      observer.next();
    }, 2000);
  });

  settings = inject(APP_SETTINGS);
  cartService = inject(CartService);
  currentDate = signal(new Date());

  title = 'Pippo';

  constructor() {}

  ngAfterViewInit(): void {
    this.title = this.settings.title;
  }
}
