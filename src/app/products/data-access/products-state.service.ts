import { inject, Injectable } from '@angular/core';
import { signalSlice } from 'ngxtension/signal-slice';
import {
  catchError,
  map,
  of,
  startWith,
  Subject,
  switchMap,
} from 'rxjs';

import { IStateProducts, Status } from '../../shared/interfaces';

import { ProductsService } from '.';

@Injectable()
export class ProductsStateService {
  private readonly productsService = inject(ProductsService);
  private initialState: IStateProducts = {
    products: [],
    status: 'loading',
    page: 1,
  };

  changePage$ = new Subject<number>();

  loadProducts$ = this.changePage$.pipe(
    startWith(1), // start with page 1 and automatically is triggered by changePage$
    switchMap((page) => this.productsService.getProducts(page)),
    map((products) => ({
      products,
      status: 'success' as Status,
    })),
    catchError((error) => {
      console.error(error);
      return of({
        products: [],
        status: 'error' as Status,
      });
    }),
  );

  state = signalSlice({
    initialState: this.initialState,
    sources: [
      this.changePage$.pipe(
        map((page) => ({
          status: 'loading' as Status,
          page,
        })),
      ),
      this.loadProducts$,
    ],
  });
}
