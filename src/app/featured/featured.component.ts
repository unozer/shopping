import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Observable } from 'rxjs';
import { Product } from '../product';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-featured',
  standalone: true,
  imports: [MatCardModule, MatButton, AsyncPipe],
  templateUrl: './featured.component.html',
  styleUrl: './featured.component.scss'
})
export class FeaturedComponent implements OnInit {

  products$: Observable<Product> | undefined;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.products$ = this.productsService.getFeatured();
  }
}
