import { Component, ElementRef, viewChild, OnInit, input } from '@angular/core';
import { filter, fromEvent, map, tap } from 'rxjs';

@Component({
    selector: 'app-key-logger',
    imports: [],
    templateUrl: './key-logger.component.html',
    styleUrl: './key-logger.component.scss'
})
export class KeyLoggerComponent implements OnInit {
  ngOnInit(): void {
    const logger$ = fromEvent<KeyboardEvent>(
      this.input()!.nativeElement,
      'keydown'
    );

    logger$
      .pipe(
        map((evt) => evt.key.charCodeAt(0)),
        filter((charCode) => {
          if (this.numeric()) {
            return charCode > 31 && (charCode < 48 || charCode > 57) === false;
          }
          return true;
        }),
        tap(digit => this.keys += String.fromCharCode(digit)),
      )
      .subscribe();
  }

  input = viewChild<ElementRef>('keyContainer');

  numeric = input(false);

  keys = '';
}
