import { createReducer, createSelector, on } from '@ngrx/store';
import { createFeatureSelector } from '@ngrx/store';
import { Product } from '../product';
import * as AppState from 'src/app/state/app.state';
import * as ProductActions from 'src/app/products/state/product.actions';

export interface State extends AppState.State {
  products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProductId: number | null;
  products: Product[];
  error: string;
}

const initialState: ProductState = {
  showProductCode: false,
  currentProductId: null,
  products: [] as Product[],
  error: '',
};

// Create a feature selector for the product state
export const selectProductState =
  createFeatureSelector<ProductState>('products');

export const getProducts = createSelector(
  selectProductState,
  (state) => state.products
);

export const getCurrentProductId = createSelector(
  selectProductState,
  (state) => state.currentProductId
);

export const getCurrentProduct = createSelector(
  selectProductState,
  getCurrentProductId,
  (state, id) => {
    if (id == null) return null;
    if (id === 0) {
      return {
        id: 0,
        productName: '',
        productCode: 'New',
        description: '',
        starRating: 0,
      };
    }

    return state.products.find((product) => product.id === id);
  }
);

export const productReducer = createReducer(
  initialState,
  on(ProductActions.toggleProductCode, (state: ProductState): ProductState => {
    return {
      ...state,
      showProductCode: !state.showProductCode,
    };
  }),
  on(
    ProductActions.clearCurrentProduct,
    (state: ProductState): ProductState => {
      return {
        ...state,
        currentProductId: null,
      };
    }
  ),
  on(
    ProductActions.setCurrentProduct,
    (state: ProductState, action): ProductState => {
      return {
        ...state,
        currentProductId: action.currentProductId,
      };
    }
  ),
  on(ProductActions.initializeCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProductId: 0,
    };
  }),
  on(ProductActions.loadProductsSuccess, (state: ProductState, action) => {
    return {
      ...state,
      products: action.products,
      error: '',
    };
  }),
  on(ProductActions.loadProductsFailure, (state: ProductState, action) => {
    return {
      ...state,
      products: [],
      error: action.error,
    };
  }),
  on(ProductActions.updateProductSuccess, (state: ProductState, action) => {
    return {
      ...state,
      products: state.products.map((product) =>
        product.id === action.product.id ? action.product : product
      ),
      currentProductId: action.product.id,
      error: '',
    };
  }),
  on(ProductActions.updateProductFailure, (state: ProductState, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(ProductActions.deleteProductSuccess, (state: ProductState, action) => {
    return {
      ...state,
      products: state.products.filter(
        (product) => product.id !== action.productId
      ),
      currentProductId: null,
      error: '',
    };
  }),
  on(ProductActions.deleteProductFailure, (state: ProductState, action) => {
    return {
      ...state,
      error: action.error,
    };
  })
);
