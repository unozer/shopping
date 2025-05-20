import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Product } from '../product';

const mockProducts: Product[] = [
  { id: 1, title: 'Test Product 1', price: 100, category: 'test', image: 'test.jpg' },
  { id: 2, title: 'Test Product 2', price: 200, category: 'test', image: 'test.jpg' }
];

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProductListComponent,
        NoopAnimationsModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({ products: mockProducts })
          }
        }
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display products from route data', () => {
    const productsData = component.products();
    expect(productsData).toEqual(mockProducts);
  });
});