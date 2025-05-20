import { CopyrightDirective } from './copyright.directive';
import { ElementRef } from '@angular/core';

describe('CopyrightDirective', () => {
  it('should create an instance', () => {
    const mockElementRef = new ElementRef(document.createElement('div'));
    const directive = new CopyrightDirective(mockElementRef, 'browser');
    expect(directive).toBeTruthy();
  });
});