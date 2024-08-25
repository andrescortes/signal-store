import { Status } from '.';
import { IProduct } from './product.interface';

export interface IStateProduct {
  product: IProduct | null;
  status: Status;
}
