import { Component } from '@angular/core';

import { catchError, of } from 'rxjs';

import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list-alt.component.html',
})
export class ProductListAltComponent {
  pageTitle = 'Products';
  errorMessage = '';
  selectedProductId = 0;

  products$ = this.productService.productsWithCategory$.pipe(
    catchError((err) => {
      this.errorMessage = err;
      return of([]);
    })
  );

  constructor(private productService: ProductService) {}

  onSelected(productId: number): void {
    this.selectedProductId = productId;
    this.productService.onSelectProductChange(productId);
  }
}
