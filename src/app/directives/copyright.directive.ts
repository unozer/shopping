import { Directive, ElementRef, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appCopyright]',
  standalone: true,
})
export class CopyrightDirective implements OnInit {

  //platform = inject(PLATFORM_ID);
  //el = inject(ElementRef);

  constructor(private el: ElementRef, @Inject(PLATFORM_ID) private platform: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platform)) {
      const currentYear = new Date().getFullYear();
      const targetElement: HTMLElement = this.el.nativeElement;
      targetElement.classList.add('copyright');
      targetElement.textContent = `Copyright ©${currentYear} Your Company Name. All rights reserved.`;
    }
  }
}
