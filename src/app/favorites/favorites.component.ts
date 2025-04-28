import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
  providers: [ProductsService]
})
export class FavoritesComponent implements OnInit {

  products: Product[] = [];

  ngOnInit(): void {
    this.products = this.productsService.getProducts();
  }

  constructor(private productsService: ProductsService) {
  }
}
