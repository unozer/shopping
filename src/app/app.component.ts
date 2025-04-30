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
    this.title = this.settings.title;
  };

  private changeTitle(callback: Function) {
    setTimeout(() => {
      callback();
    }, 2000);
  };

  private onComplete() {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  }
}
