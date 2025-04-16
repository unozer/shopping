import { Component, input, output } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  product = input.required<Product>();

  added = output<Product>();

  addToCart() {
   this.added.emit(this.product()); 
  }
}
