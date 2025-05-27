import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedComponent } from './featured.component';
import { ProductsService } from '../services/products.service';
import { of } from 'rxjs';

describe('FeaturedComponent', () => {
  let component: FeaturedComponent;
  let fixture: ComponentFixture<FeaturedComponent>;
  let productsServiceStub: Partial<ProductsService>;

  beforeEach(async () => {
    productsServiceStub = {
      getFeatured: () => of({ id: 1, title: '', price: 0, category: '', image: '' })
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
});
