import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCreateComponent } from './product-create.component';
import { provideRouter } from '@angular/router';
import { routes } from '../app.routes';
import { ProductsService } from '../services/products.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ProductCreateComponent', () => {
  let component: ProductCreateComponent;
  let fixture: ComponentFixture<ProductCreateComponent>;
  let productsServiceStub: Partial<ProductsService>;

  beforeEach(async () => {
    productsServiceStub = {};

    await TestBed.configureTestingModule({
      imports: [ProductCreateComponent, NoopAnimationsModule],
      providers: [
        { provide: ProductsService, useValue: productsServiceStub },
        provideRouter(routes)
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
