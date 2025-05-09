import { Component, input, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Product } from '../product';
import { CurrencyPipe } from '@angular/common';
import { ProductsService } from '../products.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { PriceMaximumDirective } from '../price-maximum.directive';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CurrencyPipe, AsyncPipe, FormsModule, PriceMaximumDirective],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {

  product$: Observable<Product> | undefined;
  price: number | undefined;
  id = input<string>();

  constructor(
    private productService: ProductsService, 
    private cartService: CartService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.product$ = this.productService.getProduct(Number(this.id()!));
  }

  addToCart(id: number) {
    this.cartService.addProduct(id).subscribe();
  }

  changePrice(product: Product) {
    this.productService.updateProduct(
      product.id, 
      this.price!,
    ).subscribe(
      () => this.router.navigate(['/products'])
    );
  }

  remove(product: Product) {
    this.productService.deleteProduct(product.id).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }
}
