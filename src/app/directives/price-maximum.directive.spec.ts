import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule, NgModel } from '@angular/forms';
import { PriceMaximumDirective } from './price-maximum.directive';

@Component({
    template: `<input type="number" appPriceMaximum threshold={{maxPrice}} [(ngModel)]="price">`,
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
  });

  it('should create an instance', () => {
    const directive = inputEl.injector.get(PriceMaximumDirective);
    expect(directive).toBeTruthy();
  });

  it('should be valid when price is less than maxPrice', () => {
    component.price = 80;
    fixture.detectChanges();
    expect(inputEl.nativeElement.validity.valid).toBeTrue();
  });

  it('should be valid when price is equal to maxPrice', () => {
    component.price = 100;
    fixture.detectChanges();
    expect(inputEl.nativeElement.validity.valid).toBeTrue();
  });

  it('should be invalid when price is greater than maxPrice', async () => {
    component.price = 120;
    fixture.detectChanges();
    
    inputEl.nativeElement.value = component.price;
    inputEl.nativeElement.dispatchEvent(new Event('input'));
    
    await fixture.whenStable();
    fixture.detectChanges();
    
    const ngModel = inputEl.injector.get(NgModel);
    expect(ngModel.valid).toBeFalse();
    expect(ngModel.errors).toBeTruthy();
  });

  it('should update validity when price changes', async () => {
    component.price = 120;
    fixture.detectChanges();
    
    inputEl.nativeElement.value = component.price;
    inputEl.nativeElement.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    fixture.detectChanges();
    
    const ngModel = inputEl.injector.get(NgModel);
    expect(ngModel.valid).toBeFalse();

    component.price = 80;
    fixture.detectChanges();
    
    inputEl.nativeElement.value = component.price;
    inputEl.nativeElement.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    fixture.detectChanges();
    
    expect(ngModel.valid).toBeTrue();
  });
});