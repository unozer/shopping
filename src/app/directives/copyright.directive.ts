import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCopyright]',
  standalone: true
})
export class CopyrightDirective {

  constructor(private el: ElementRef) {
    const currentYear = new Date().getFullYear();
    const targetElement: HTMLElement = this.el.nativeElement;
    targetElement.classList.add('copyright');
    targetElement.textContent = `Copyright ©${currentYear} Your Company Name. All rights reserved.`;
  }

}
