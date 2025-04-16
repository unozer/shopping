import { Component } from '@angular/core';
import { Product } from '../product';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductDetailComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  products: Product[] = [
    { id: 1, title: 'Keyboard'},
    { id: 2, title: 'Microphone'},
    { id: 3, title: 'Webcam'},
    { id: 4, title: 'Tablet'}
  ];

  selectedProduct: Product | undefined;
}
