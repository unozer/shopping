import { Component, input, output, ViewEncapsulation } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ProductDetailComponent {
  product = input.required<Product>();

  added = output<Product>();

  addToCart() {
   this.added.emit(this.product()); 
  }
}
