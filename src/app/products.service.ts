import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from './product';
import { map, Observable, of } from 'rxjs';
import { APP_SETTINGS } from './app.settings';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private productsUrl = `${inject(APP_SETTINGS).apiUrl}/products`;

  constructor(private http: HttpClient) {}

  private products: Product[] = [];

  getProducts(): Observable<Product[]> {
    const options = new HttpParams().set('limit', '10');
    return this.http
    .get<Product[]>(this.productsUrl, { params: options })
    .pipe(
      map((products) => {
        this.products = products;
        return products;
      }
    ));
  }

  getProduct(id: number): Observable<Product> {
    const product = this.products.find((p) => p.id === id);
    return of(product!);
  }
}
