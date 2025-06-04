import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { Product } from '../model/product';
import { HttpResourceRef } from '@angular/common/http';

export const productsResolver: ResolveFn<HttpResourceRef<Product[] | undefined>> = (route, state) => {
  const productsService = inject(ProductsService);
  const limit = Number(route.queryParamMap.get('limit'));
  return productsService.getProducts(limit);
};
