import { Component, input, output, OnChanges, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable, switchMap } from 'rxjs';
import { Product } from '../product';
import { CurrencyPipe } from '@angular/common';
import { ProductsService } from '../products.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CurrencyPipe, AsyncPipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {

  product$: Observable<Product> | undefined;

  constructor(
    private productService: ProductsService, 
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.product$ = this.route.paramMap.pipe(
      switchMap((params) => {
        return this.productService.getProduct(Number(params.get('id')));
      }
    ));
  }

  addToCart() {}

  changePrice(product: Product, price: string) {
    this.productService.updateProduct(product.id, Number(price)).subscribe(
      () => this.router.navigate(['/products'])
    );
  }

  remove(product: Product) {
    this.productService.deleteProduct(product.id).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }
}
