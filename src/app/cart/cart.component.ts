import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../model/product';
import { ProductsService } from '../services/products.service';
import { CartService } from '../services/cart.service';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/input';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ReactiveFormsModule,MatFormField, MatLabel, MatInput],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  products: Product[] = [];

  cartForm = new FormGroup({
    products: new FormArray<FormControl<number>>([])
  });

  ngOnInit(): void {
    this.getProducts();
    this.buildForm();
  }

  constructor(private cartService: CartService, private producctService: ProductsService) {}

  private getProducts() {
    this.producctService.getProducts().subscribe(products => {
      this.cartService.cart?.products.forEach(cartProduct => {
        const product = products.find(p => p.id === cartProduct.productId);
        if (product) {
          this.products.push(product);
        }
      });
    });
  }

  private buildForm() {
    this.products.forEach(() => {
      this.cartForm.controls.products.push(new FormControl(1, { nonNullable: true }));
    });
  }
}
