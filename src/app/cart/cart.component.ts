import { Component, OnInit, effect, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../model/product';
import { ProductsService } from '../services/products.service';
import { CartService } from '../services/cart.service';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/input';

@Component({
    selector: 'app-cart',
    imports: [ReactiveFormsModule, MatFormField, MatLabel, MatInput],
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  private productService = inject(ProductsService);
  products: Product[] = [];

  cartForm = new FormGroup({
    products: new FormArray<FormControl<number>>([])
  });

  ngOnInit(): void {
    this.getProducts();
  }

  constructor(private cartService: CartService) {
    effect(() => {
      const productsRef = this.productService.getProducts();
      if (!productsRef.error) {
        this.products = [];
        this.cartService.cart?.products.forEach(cartProduct => {
          //const product = productsRef.data.find(p => p.id === cartProduct.productId);
          // if (product) {
          //   this.products.push(product);
          // }
        });
        this.buildForm();
      }
    });
  }

  private getProducts() {
    this.productService.getProducts();
  }

  private buildForm() {
    this.cartForm.controls.products.clear();
    this.products.forEach(() => {
      this.cartForm.controls.products.push(new FormControl(1, { nonNullable: true }));
    });
  }
}
