import { Component } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  products: Product[] = [

  ];

  isLiked: boolean = true;

  currentStyles = {
    color: 'red',
    with: '100px'
  };
}
