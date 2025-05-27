import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { ProductsService } from '../services/products.service';
import { priceMaximumValidator } from '../directives/price-maximum.validator';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatError, MatLabel } from '@angular/material/input';
import { MatSelect, MatOption } from '@angular/material/select';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButton,
    MatFormField,
    MatError,
    MatLabel,
    MatInput,
    MatSelect,
    MatOption,
  ],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.scss',
})
export class ProductCreateComponent implements OnInit {
  productForm:
    | FormGroup<{
        title: FormControl<string>;
        price: FormControl<number | undefined>;
        category: FormControl<string>;
      }>
    | undefined;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.productForm!.controls.category.valueChanges.subscribe(() => {
      this.productForm!.controls.price.reset();
    });
  }

  buildForm() {
    this.productForm = this.formBuilder.nonNullable.group({
      title: ['', Validators.required],
      price: this.formBuilder.nonNullable.control<number | undefined>(
        undefined,
        [Validators.required, Validators.min(1), priceMaximumValidator(1000)]
      ),
      category: ['', Validators.required],
    });
  }

  createProduct() {
    this.productsService
      .addProduct(this.productForm!.value)
      .subscribe(() => this.router.navigate(['/products']));
  }
}
