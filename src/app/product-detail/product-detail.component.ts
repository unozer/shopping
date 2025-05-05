import { Component, input, output, OnChanges } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Product } from '../product';
import { CurrencyPipe } from '@angular/common';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CurrencyPipe, AsyncPipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnChanges {

  constructor(private productService: ProductsService) {}
  
  ngOnChanges(): void {
    this.product$ = this.productService.getProduct(this.id()!);
  }

  id = input<number>();

  deleted = output();

  added = output<Product>();

  product$: Observable<Product> | undefined;

  addToCart() {

  }

  changePrice(product: Product, price: string) {
    this.productService.updateProduct(product.id, Number(price)).subscribe();
  }

  remove(product: Product) {
    this.productService.deleteProduct(product.id).subscribe(() => {
      this.deleted.emit();
    });
  }
}
