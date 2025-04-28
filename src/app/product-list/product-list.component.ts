import { Component, OnInit, inject } from '@angular/core';
import { Product } from '../product';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { SortPipe } from '../pipes/sort.pipe';
import { ProductsService } from '../products.service';
import { FavoritesComponent } from '../favorites/favorites.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductDetailComponent, SortPipe, FavoritesComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {

  private productsService = inject(ProductsService);

  products: Product[] = [];

  selectedProduct: Product | undefined = this.products[0];

  onAdded(product: Product) {
    alert(`${product.title} Product added to cart!`)
  }

  ngOnInit(): void {
    this.products = this.productsService.getProducts();
  }

  constructor() {
  }
}
