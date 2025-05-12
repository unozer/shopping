import { toSignal } from '@angular/core/rxjs-interop';
import { Component } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { Product } from '../product';
import { SortPipe } from '../pipes/sort.pipe';
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [SortPipe, RouterLink, MatMiniFabButton, MatIcon, MatCardModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  products = toSignal(
    this.route.data.pipe(switchMap((data) => of(data['products'])))
  );

  selectedProduct: Product | undefined;

  onAdded(product: Product) {
    alert(`${product.title} Product added to cart!`);
  }

  constructor(private route: ActivatedRoute) {}
}
