import { ChangeDetectionStrategy, Component, input, output, ViewEncapsulation, OnInit } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent implements OnInit {

  constructor() { 
    console.log('Product:', this.product())
  }

  ngOnInit(): void {
    console.log('Product:', this.product())
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
