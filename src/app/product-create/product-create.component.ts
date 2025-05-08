import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.scss'
})
export class ProductCreateComponent {

  productForm = new FormGroup({
    title: new FormControl('', { nonNullable: true }),
    price: new FormControl<number | undefined>(undefined, { nonNullable: true }),
    category: new FormControl('', { nonNullable: true })
  });

  constructor(private productsService: ProductsService, private router: Router) {}

  createProduct() {
    this.productsService.addProduct({ 
      title: this.productForm.controls.title.value, 
      price: this.productForm.controls.price.value,
      category: this.productForm.controls.category.value 
    }).subscribe(() => this.router.navigate(['/products']));
  }
}
