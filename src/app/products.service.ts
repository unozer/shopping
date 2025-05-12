import { HttpClient, HttpErrorResponse, HttpParams, HttpStatusCode } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from './product';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { APP_SETTINGS } from './app.settings';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private productsUrl = `${inject(APP_SETTINGS).apiUrl}/products`;

  constructor(private http: HttpClient) {}

  private products: Product[] = [];

  private handleError(error: HttpErrorResponse) {
    let message = "";
    switch (error.status) {
      case HttpStatusCode.InternalServerError:
        message = "Server error. Please try again later.";
        break;
      case HttpStatusCode.BadRequest:
        message = "Bad request. Please check your input.";
        break;
      default:
        message = "An unknown error occurred.";
    }

    console.error(message, error.error);

    return throwError(() => error);
  }

  getProducts(limit?: number): Observable<Product[]> {
    if (this.products.length === 0) {
      const options = new HttpParams().set('limit', limit || '10');
      return this.http
        .get<Product[]>(this.productsUrl, { params: options })
        .pipe(
          map((products) => {
            this.products = products;
            return products;
          }),
          catchError(this.handleError),
        );
    } else {
      return of(this.products);
    }
  }

  getProduct(id: number): Observable<Product> {
    const product = this.products.find((p) => p.id === id);
    return of(product!);
  }

  addProduct(newProduct: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, newProduct).pipe(
      map((product) => {
        this.products.push(product);
        return product;
      })
    );
  }

  updateProduct(id: number, price: number): Observable<Product> {
    return this.http
      .patch<Product>(`${this.productsUrl}/${id}`, { price })
      .pipe(
        map((product) => {
          const index = this.products.findIndex((p) => p.id === id);
          this.products[index].price = price;
          return product;
        })
      );
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.productsUrl}/${id}`).pipe(
      tap(() => {
        const index = this.products.findIndex((p) => p.id === id);
        this.products.splice(index, 1);
      })
    );
  }
}
