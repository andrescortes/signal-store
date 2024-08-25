import { IProductItemCart } from './product-item-cart.interface';

export interface IStateProductCart {
  products: IProductItemCart[];
  loaded: boolean;
}
