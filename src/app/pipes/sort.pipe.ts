import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../product';

@Pipe({
  name: 'sort',
  standalone: true
})
export class SortPipe implements PipeTransform {

  transform(value: Product[], args: keyof Product): Product[] {
    if (value) {
      return value.sort((a : Product, b : Product) => {
        if (a[args] < b[args]) {
          return -1
        } else if (a[args] > b[args]) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    return [];
  }

}
