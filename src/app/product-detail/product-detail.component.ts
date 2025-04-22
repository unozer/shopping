import { ChangeDetectionStrategy, Component, input, output, ViewEncapsulation, OnInit, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { Product } from '../product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent implements OnInit, OnChanges {

  constructor() { 
    console.log('<Constructor> Product:', this.product())
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    const product = changes['product'];
    if (!product.isFirstChange()) { 
      const oldValue = product.previousValue;
      const newValue = product.currentValue;
      console.log('<ngOnChanges> Product changed from', oldValue, 'to', newValue);
    }
  }

  ngOnInit(): void {
    console.log('<ngOnInit> Product:', this.product())
  }

  product = input<Product>();

  added = output<Product>();

  addToCart() {
   this.added.emit(this.product()!); 
  }

  get productTitle() {
    return this.product()!.title;
  }
}
