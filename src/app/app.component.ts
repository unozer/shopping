import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Observable } from 'rxjs';
import { CopyrightDirective } from './directives/copyright.directive';
import { APP_SETTINGS, appSettings } from './app.settings';
import { AuthComponent } from './auth/auth.component';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CopyrightDirective,
    AuthComponent,
    RouterLink,
    RouterLinkActive,
    MatToolbar,
    MatToolbarRow,
    MatButton,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [{ provide: APP_SETTINGS, useValue: appSettings }],
})
export class AppComponent implements AfterViewInit {
  title$ = new Observable<void>((observer) => {
    setInterval(() => {
      observer.next();
    }, 2000);
  });

  settings = inject(APP_SETTINGS);

  currentDate = signal(new Date());

  title = 'Pippo';

  constructor() {}

  ngAfterViewInit(): void {
    this.title = this.settings.title;
  }
}
