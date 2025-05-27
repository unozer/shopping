import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedComponent } from './featured.component';
import { ProductsService } from '../services/products.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('FeaturedComponent', () => {
  let component: FeaturedComponent;
  let fixture: ComponentFixture<FeaturedComponent>;
  let productsServiceStub: Partial<ProductsService>;

  beforeEach(async () => {
    productsServiceStub = {
      getFeatured: jasmine.createSpy('getFeatured').and.returnValue(
        of({ id: 1, title: 'Test Product', price: 100, category: 'Test', image: 'test.jpg' })
      )
    };

    await TestBed.configureTestingModule({
      imports: [FeaturedComponent],
      providers: [
        { provide: ProductsService, useValue: productsServiceStub }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeaturedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getFeatured on ProductsService', () => {
    component.ngOnInit();
    expect(productsServiceStub.getFeatured).toHaveBeenCalled();
  });

  it('should display product title in the card subtitle', () => {
    fixture.detectChanges();
    const subtitle = fixture.debugElement.query(By.css('mat-card-subtitle'));
    expect(subtitle.nativeElement.textContent).toContain('Test Product');
  });

  it('should display product image', () => {
    fixture.detectChanges();
    const img = fixture.debugElement.query(By.css('img[mat-card-image]'));
    expect(img).toBeTruthy();
    expect(img.nativeElement.src).toContain('test.jpg');
  });

  it('should display "Buy Now" button', () => {
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button[mat-raised-button]'));
    expect(button).toBeTruthy();
    expect(button.nativeElement.textContent).toContain('Buy Now');
  });
});