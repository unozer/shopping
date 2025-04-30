import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Component, OnInit, inject } from '@angular/core';
import { Product } from '../product';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { SortPipe } from '../pipes/sort.pipe';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductDetailComponent, SortPipe, AsyncPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {

  private productsService = inject(ProductsService);

  products$: Observable<Product[]> | undefined;

  selectedProduct: Product | undefined;

  onAdded(product: Product) {
    alert(`${product.title} Product added to cart!`)
  }

  ngOnInit(): void {
    this.getProducts();
  }

  constructor() {
  }

  private getProducts() {
    this.products$ = this.productsService.getProducts();
  }
}
