import { inject, Injectable } from '@angular/core';
import { signalSlice } from 'ngxtension/signal-slice';

import { IStateProduct, Status } from '../../shared/interfaces';
import { ProductsService } from '.';
import { catchError, map, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailStateService {
  private readonly productsService = inject(ProductsService);
  private initialState: IStateProduct = {
    product: null,
    status: 'loading',
  };

  state = signalSlice({
    initialState: this.initialState,
    actionSources: {
      getbyId: (_state, $: Observable<number>) =>
        $.pipe(
          switchMap((id) => this.productsService.getProductById(id)),
          map((product) => ({ product, status: 'success' as Status })),
          catchError(() => of({ product: null, status: 'error' as Status })),
        ),
    },
  });
}
