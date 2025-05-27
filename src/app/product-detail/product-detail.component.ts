import { Component, input, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Product } from '../model/product';
import { CurrencyPipe } from '@angular/common';
import { ProductsService } from '../services/products.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { PriceMaximumDirective } from '../directives/price-maximum.directive';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatError, MatSuffix } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatChipSet, MatChip } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Unary } from '@angular/compiler';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CurrencyPipe,
    AsyncPipe,
    FormsModule,
    PriceMaximumDirective,
    MatButton,
    MatFormField,
    MatError,
    MatSuffix,
    MatInput,
    MatIcon,
    MatIconButton,
    MatChipSet,
    MatChip,
    MatSnackBarModule,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit {
  product$: Observable<Product> | undefined;
  price: number | undefined;
  id = input<string>();

  constructor(
    private productService: ProductsService,
    private cartService: CartService,
    public authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.product$ = this.productService.getProduct(Number(this.id()!));
  }

  addToCart(id: number) {
    this.cartService.addProduct(id).subscribe();
    this.snackBar.open('Product added to cart', undefined, {
      duration: 2000,
    });
  }

  changePrice(product: Product) {
    this.productService
      .updateProduct(product.id, this.price!)
      .subscribe(() => this.router.navigate(['/products']));
    this.snackBar.open('Product price updated', 'Close', {
      duration: 2000,
    });
  }

  remove(product: Product) {
    this.productService.deleteProduct(product.id).subscribe(() => {
      this.router.navigate(['/products']);
    });
    this.snackBar.open('Product removed', 'Close', {});
  }
}
