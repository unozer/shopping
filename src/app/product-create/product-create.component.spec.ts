import { ProductCreateComponent } from './product-create.component';
import { routes } from '../app.routes';
import { ProductsService } from '../services/products.service';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { provideRouter } from '@angular/router';

describe('ProductCreateComponent', () => {
  let component: ProductCreateComponent;
  let fixture: ComponentFixture<ProductCreateComponent>;
  let productsServiceStub: Partial<ProductsService>;
  let router: Router;

  beforeEach(async () => {
    productsServiceStub = {
      addProduct: jasmine
        .createSpy('addProduct')
        .and.returnValue(of({}))
    };

    await TestBed.configureTestingModule({
      imports: [ProductCreateComponent, NoopAnimationsModule],
      providers: [
        { provide: ProductsService, useValue: productsServiceStub },
        FormBuilder,
        provideRouter(routes)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCreateComponent);
    component = fixture.componentInstance;

    router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    const form = component.productForm!;
    expect(form).toBeDefined();
    expect(form.value.title).toBe('');
    expect(form.value.category).toBe('');
    expect(form.controls.price.value).toBeNull();
  });

  it('should invalidate the form if required fields are missing', () => {
    component.productForm!.patchValue({ title: 'Test', price: undefined, category: 'jewelery' });
    expect(component.productForm!.invalid).toBeTrue();
    component.productForm!.patchValue({ title: 'Test', price: 10, category: '' });
    expect(component.productForm!.invalid).toBeTrue();
    component.productForm!.patchValue({ title: '', price: 10, category: 'jewelery' });
    expect(component.productForm!.invalid).toBeTrue();
  });

  it('should validate price minimum and maximum', () => {
    const form = component.productForm!;
    form.controls.title.setValue('Test');
    form.controls.category.setValue('jewelery');
    form.controls.price.setValue(0);
    expect(form.controls.price.hasError('min')).toBeTrue();

    form.controls.price.setValue(1001);
    expect(form.controls.price.hasError('priceMaximum')).toBeTrue();

    form.controls.price.setValue(500);
    expect(form.controls.price.valid).toBeTrue();
  });

  it('should reset price when category changes', () => {
    component.productForm!.patchValue({ price: 123 });
    component.productForm!.controls.category.setValue('electronics');
    expect(component.productForm!.controls.price.value).toBeNull();
  });

  it('should call addProduct and navigate on createProduct', fakeAsync(() => {
    const form = component.productForm!;

    form.controls.title.setValue('Test');
    form.controls.category.setValue('jewelery');
    form.controls.price.setValue(100);

    component.createProduct();

    expect(productsServiceStub.addProduct).toHaveBeenCalledWith({
      title: 'Test',
      price: 100,
      category: 'jewelery'
    });

    tick();

    expect(router.navigate).toHaveBeenCalledWith(['/products']);
  }));
});
