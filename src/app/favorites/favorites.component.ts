import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductsService } from '../products.service';
import { FavoritesService } from '../favorites.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
  providers: [
    { provide: ProductsService, useClass: FavoritesService },
  ],
})
export class FavoritesComponent implements OnInit {

  products: Product[] = [];

  ngOnInit(): void {
    this.products = this.productsService.getProducts();
  }

  constructor(private productsService: ProductsService) {
  }
}
