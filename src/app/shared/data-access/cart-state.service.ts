import { inject, Injectable, Signal } from '@angular/core';
import { IProductItemCart, IStateProductCart } from '../interfaces';
import { signalSlice } from 'ngxtension/signal-slice';
import { StorageService } from './storage.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartStateService {
  private readonly storageService = inject(StorageService);
  private initialState: IStateProductCart = {
    products: [],
    loaded: false,
  };

  loadProducts$ = this.storageService
    .loadProducts()
    .pipe(map((products) => ({ products, loaded: true })));

  private addProduct(
    state: Signal<IStateProductCart>,
    product: IProductItemCart,
  ) {
    const isInCart = state().products.find(
      (productInCart) => productInCart.product.id === product.product.id,
    );

    if (!isInCart) {
      return {
        products: [...state().products, { ...product, quantity: 1 }],
      };
    }
    isInCart.quantity += 1;
    return {
      products: [...state().products],
    };
  }

  private removeProductById(state: Signal<IStateProductCart>, id: number) {
    return {
      products: state().products.filter((product) => product.product.id !== id),
    };
  }

  private updateProductQuantity(
    state: Signal<IStateProductCart>,
    productItem: IProductItemCart,
  ) {
    return {
      products: state().products.map((product) => {
        if (product.product.id === productItem.product.id) {
          return {
            ...product,
            quantity: productItem.quantity,
          };
        }
        return product;
      }),
    };
  }

  state = signalSlice({
    initialState: this.initialState,
    sources: [this.loadProducts$],
    actionSources: {
      addToCart: (_state, $: Observable<IProductItemCart>) =>
        $.pipe(map((product) => this.addProduct(_state, product))),
      removeFromCart: (_state, $: Observable<number>) =>
        $.pipe(map((id) => this.removeProductById(_state, id))),
      updateQuantity: (_state, $: Observable<IProductItemCart>) =>
        $.pipe(map((product) => this.updateProductQuantity(_state, product))),
    },
    selectors: (state) => ({
      count: () =>
        state().products.reduce((acc, product) => acc + product.quantity, 0),
      price: () =>
        state().products.reduce(
          (acc, product) => acc + product.product.price * product.quantity,
          0,
        ),
    }),
    effects: (state) => ({
      load: () => {
        if (state().loaded) {
          console.log('products', state().products);
          this.storageService.saveProducts(state().products);
        }
      },
    }),
  });
}
