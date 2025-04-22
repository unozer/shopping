import { Component } from '@angular/core';
import { Product } from '../product';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { SortPipe } from '../pipes/sort.pipe';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductDetailComponent, SortPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  products: Product[] = [
    { id: 1, title: 'Keyboard', price: 100, categories: { 1: 'Computing', 2: 'Peripherals' } },
    { id: 2, title: 'Microphone', price: 35, categories: { 3: 'Multimedia' } },
    { id: 3, title: 'Webcam', price: 79, categories: { 1: 'Computing', 3: 'Multimedia' } },
    { id: 4, title: 'Tablet', price: 500, categories: { 4: 'Entertainment' } },
  ];

  selectedProduct: Product | undefined = this.products[0];

  onAdded(product: Product) {
    alert(`${product.title} Product added to cart!`)
  }
}
