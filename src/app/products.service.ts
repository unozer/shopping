import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from './product';
import { Observable, of } from 'rxjs';
import { APP_SETTINGS } from './app.settings';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  private productsUrl = `${inject(APP_SETTINGS).apiUrl}/products`;

  constructor(private http: HttpClient) {}

  private products: Product[] = [];

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }
}
