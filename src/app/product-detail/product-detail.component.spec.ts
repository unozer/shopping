import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailComponent } from './product-detail.component';
import { ProductsService } from '../services/products.service';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';
import { computed } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let productsServiceStub: Partial<ProductsService>;
  let cartServiceStub: Partial<CartService>;
  let authServiceStub: Partial<AuthService>;

  beforeEach(async () => {
    productsServiceStub = {
      getProduct: (id: number) => of({
        id: 1,
        name: 'Test Product',
        price: 100,
        description: 'Test Description',
        imageUrl: 'test.jpg',
        category: 'Test Category',
        title: 'Test Product Title',
        image: 'test-image.jpg',
      }),
    };
    cartServiceStub = {};
    authServiceStub = {
      isLoggedIn: computed(() => false)
    };

    await TestBed.configureTestingModule({
      imports: [ProductDetailComponent, NoopAnimationsModule],
      providers: [
        { provide: ProductsService, useValue: productsServiceStub },
        { provide: CartService, useValue: cartServiceStub },
        { provide: AuthService, useValue: authServiceStub },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
