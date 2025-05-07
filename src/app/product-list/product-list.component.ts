import { toSignal } from '@angular/core/rxjs-interop';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../product';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { SortPipe } from '../pipes/sort.pipe';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductDetailComponent, SortPipe, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {

  products = toSignal(inject(ProductsService).getProducts(), { 
    initialValue: [] 
  });

  selectedProduct: Product | undefined;

  onAdded(product: Product) {
    alert(`${product.title} Product added to cart!`)
  }
}
