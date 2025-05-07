import { toSignal } from '@angular/core/rxjs-interop';
import { Component } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from '../product';
import { SortPipe } from '../pipes/sort.pipe';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [SortPipe, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {

  products = toSignal(
    this.route.queryParamMap.pipe(
      switchMap(params => {
        return this.productService.getProducts(Number(params.get('limit')));
      })
    )
  );

  selectedProduct: Product | undefined;

  onAdded(product: Product) {
    alert(`${product.title} Product added to cart!`)
  }

  constructor(
    private productService: ProductsService, 
    private route: ActivatedRoute
  ) {}
}
