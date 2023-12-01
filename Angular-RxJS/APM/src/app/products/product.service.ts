import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import {
  BehaviorSubject,
  catchError,
  combineLatest,
  map,
  merge,
  Observable,
  scan,
  shareReplay,
  Subject,
  tap,
  throwError,
} from 'rxjs';

import { Product } from './product';
import { ProductCategoryService } from '../product-categories/product-category.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = 'api/products';
  private suppliersUrl = 'api/suppliers';

  categories$ = this.productCategoryService.productCategories$.pipe(
    catchError(this.handleError)
  );

  products$ = this.http.get<Product[]>(this.productsUrl).pipe(
    tap((data) => console.log('Products: ', JSON.stringify(data))),
    catchError(this.handleError)
  );

  productsWithCategory$ = combineLatest([
    this.products$,
    this.categories$,
  ]).pipe(
    map(([products, categories]) =>
      products.map((product) => ({
        ...product,
        price: product.price ? product.price * 1.5 : 0,
        category: categories.find(
          (category) => category.id === product.categoryId
        )?.name,
      }))
    ),
    shareReplay(1)
  );

  private selectedProductId$ = new BehaviorSubject(0);

  selectedProduct$ = combineLatest([
    this.productsWithCategory$,
    this.selectedProductId$,
  ]).pipe(
    map(([products, id]) => products.find((product) => product.id === id)),
    tap((product) => console.log('selected product:', product))
  );

  private newProduct$ = new Subject();

  productsWithAdd$ = merge(this.productsWithCategory$, this.newProduct$).pipe(
    scan((acc, curr) => {
      if (curr instanceof Array) {
        return [...curr];
      }
      return [...acc, curr];
    }, [] as Product[])
  );

  constructor(
    private http: HttpClient,
    private productCategoryService: ProductCategoryService
  ) {}

  private fakeProduct(): Product {
    return {
      id: 42,
      productName: 'Another One',
      productCode: 'TBX-0042',
      description: 'Our new product',
      price: 8.9,
      categoryId: 3,
      category: 'Toolbox',
      quantityInStock: 30,
    };
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    }
    console.error(err);
    return throwError(() => errorMessage);
  }

  onSelectProductChange(id: number) {
    this.selectedProductId$.next(id);
  }

  addProduct(newProduct? : Product) {
    const product = newProduct ?? this.fakeProduct();
    this.newProduct$.next(product);
  }
}
