import { Component, ElementRef, viewChild, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-key-logger',
  standalone: true,
  imports: [],
  templateUrl: './key-logger.component.html',
  styleUrl: './key-logger.component.scss'
})
export class KeyLoggerComponent implements OnInit {

  ngOnInit(): void {
    const logger$ = fromEvent<KeyboardEvent>(this.input()!.nativeElement, 'keydown');
    logger$.subscribe(event => {
      this.keys += event.key;
    });
  }

  input = viewChild<ElementRef>('keyContainer');

  keys = '';
}
