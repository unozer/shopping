import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { PriceMaximumDirective } from './price-maximum.directive';

@Component({
  template: `<input type="number" appPriceMaximum="maxPrice" [(ngModel)]="price">`,
  standalone: true,
  imports: [FormsModule, PriceMaximumDirective]
})
class TestComponent {
  maxPrice = 100;
  price = 50;
}

describe('PriceMaximumDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let inputEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, PriceMaximumDirective, TestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = inputEl.injector.get(PriceMaximumDirective);
    expect(directive).toBeTruthy();
  });
});
