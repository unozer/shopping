import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';
import { priceMaximumValidator } from '../price-maximum.validator';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.scss'
})
export class ProductCreateComponent implements OnInit {

  productForm: FormGroup<{
    title: FormControl<string>,
    price: FormControl<number | undefined>,
    category: FormControl<string>
  }> | undefined;

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
      price: this.formBuilder.nonNullable.control<number | undefined>(undefined, 
        [Validators.required, 
          Validators.min(1),
          priceMaximumValidator(1000)]),
      category: ['', Validators.required]
    });
  }

  createProduct() {
    this.productsService.addProduct(
      this.productForm!.value
    ).subscribe(() => this.router.navigate(['/products']));
  }
}
