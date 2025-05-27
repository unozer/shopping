import { CopyrightDirective } from './copyright.directive';
import { ElementRef } from '@angular/core';
import * as common from '@angular/common';

describe('CopyrightDirective', () => {
  let mockElement: HTMLDivElement;
  let mockElementRef: ElementRef;

  beforeEach(() => {
    mockElement = document.createElement('div');
    mockElementRef = new ElementRef(mockElement);
  });

  it('should create an instance', () => {
    const directive = new CopyrightDirective(mockElementRef, 'browser');
    expect(directive).toBeTruthy();
  });

  it('should set copyright text and class when platform is browser', () => {
    const directive = new CopyrightDirective(mockElementRef, 'browser');
    directive.ngOnInit();
    expect(mockElement.classList.contains('copyright')).toBeTrue();
    expect(mockElement.textContent).toContain(`Copyright ©${new Date().getFullYear()}`);
    expect(mockElement.textContent).toContain('Your Company Name');
  });

  it('should not set copyright text or class when platform is not browser', () => {
    const directive = new CopyrightDirective(mockElementRef, 'server');
    directive.ngOnInit();
    expect(mockElement.classList.contains('copyright')).toBeFalse();
    expect(mockElement.textContent).toBe('');
  });
});