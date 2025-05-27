import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { CartService } from '../services/cart.service';
import { ProductsService } from '../services/products.service';
import { of } from 'rxjs';
import { Product } from '../model/product';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartServiceStub: any;
  let productsServiceStub: any;

  beforeEach(async () => {
    cartServiceStub = {
      cart: {
        products: [
          { productId: 1, quantity: 2 },
          { productId: 2, quantity: 1 }
        ]
      }
    };
    productsServiceStub = {
      getProducts: jasmine.createSpy('getProducts').and.returnValue(of([
        { id: 1, title: 'Product 1' },
        { id: 2, title: 'Product 2' },
        { id: 3, title: 'Product 3' }
      ] as Product[]))
    };

    await TestBed.configureTestingModule({
      imports: [CartComponent, NoopAnimationsModule],
      providers: [
        { provide: CartService, useValue: cartServiceStub },
        { provide: ProductsService, useValue: productsServiceStub }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getProducts on ngOnInit', () => {
    expect(productsServiceStub.getProducts).toHaveBeenCalled();
  });

  it('should populate products array with products in cart', () => {
    expect(component.products.length).toBe(2);
    expect(component.products[0].id).toBe(1);
    expect(component.products[1].id).toBe(2);
  });

  it('should build form controls for each product in cart', () => {
    expect(component.cartForm.controls.products.length).toBe(2);
    expect(component.cartForm.controls.products.at(0).value).toBe(1);
    expect(component.cartForm.controls.products.at(1).value).toBe(1);
  });

  it('should render product titles in the template', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Product 1');
    expect(compiled.textContent).toContain('Product 2');
  });
});
