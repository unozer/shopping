import { CommonModule } from '@angular/common';
import { Component, Host, OnInit, Optional } from '@angular/core';
import { Product } from '../product';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent implements OnInit {

  products: Product[] = [];

  ngOnInit(): void {
    this.products = this.productsService.getProducts();
  }

  constructor(@Optional() @Host() private productsService: ProductsService) {
  }
}
