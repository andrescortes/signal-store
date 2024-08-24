import { IProduct } from './product.interface';

export interface IStateProducts {
  products: IProduct[];
  status: Status;
  page: number;
}

export type Status = 'loading' | 'success' | 'error';
