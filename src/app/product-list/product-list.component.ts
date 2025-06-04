import { toSignal } from '@angular/core/rxjs-interop';
import { Component } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { Product } from '../model/product';
import { SortPipe } from '../pipes/sort.pipe';
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import {
  MatButtonToggle,
  MatButtonToggleGroup,
} from '@angular/material/button-toggle';

@Component({
    selector: 'app-product-list',
    imports: [
        SortPipe,
        RouterLink,
        MatMiniFabButton,
        MatIcon,
        MatCardModule,
        MatTableModule,
        CurrencyPipe,
        MatButtonToggle,
        MatButtonToggleGroup,
        NgOptimizedImage
    ],
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  products = toSignal(
    this.route.data.pipe(switchMap((data) => of(data['products'])))
  );

  selectedProduct: Product | undefined;

  columnNames = ['title', 'price'];

  onAdded(product: Product) {
    alert(`${product.title} Product added to cart!`);
  }

  constructor(private route: ActivatedRoute) {}
}
