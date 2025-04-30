import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { CopyrightDirective } from './directives/copyright.directive';
import { APP_SETTINGS, appSettings } from './app.settings';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductListComponent, CopyrightDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [{ provide: APP_SETTINGS, useValue: appSettings }],
})
export class AppComponent {
  title = 'shopping';

  settings = inject(APP_SETTINGS);

  constructor() {
    this.onComplete().then(this.setTitle);
  }

  private setTitle = () => {
    const timestamp = new Date();
    this.title = `${this.settings.title} - ${timestamp}`;
  };

  private onComplete() {
    return new Promise<void>(resolve => {
      setInterval(() => {
        resolve();
      }, 2000);
    });
  }
}
