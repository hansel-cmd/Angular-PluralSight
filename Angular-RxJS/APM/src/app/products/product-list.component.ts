import { Component } from '@angular/core';

import { ProductService } from './product.service';
import { BehaviorSubject, catchError, combineLatest, map, of } from 'rxjs';
import { ProductCategoryService } from '../product-categories/product-category.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  pageTitle = 'Product List';
  errorMessage = '';
  private selectedCategoryId$ = new BehaviorSubject(0);
  categorySelectedAction$ = this.selectedCategoryId$.asObservable(); // outside component can access this
  categories$ = this.productCategoryService.productCategories$.pipe(
    catchError((err) => {
      this.errorMessage = err;
      return of([]);
    })
  );

  products$ = combineLatest([
    this.productService.productsWithAdd$,
    this.selectedCategoryId$,
  ]).pipe(
    map(([products, categoryId]) =>
      products.filter((product) => {
        if (categoryId === 0) return true;
        if (!product.categoryId) return true;
        return product.categoryId === categoryId;
      })
    ),
    catchError((err) => {
      this.errorMessage = err;
      return of([]);
    })
  );

  constructor(
    private productService: ProductService,
    private productCategoryService: ProductCategoryService
  ) {}

  onAdd(): void {
    console.log('Not yet implemented');
    this.productService.addProduct();
  }

  onSelected(categoryId: string): void {
    this.selectedCategoryId$.next(+categoryId);
  }
}
