import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../shared/data-access';
import { map, Observable } from 'rxjs';
import { IProduct } from '../../shared/interfaces';

const LIMIT = 5;

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends BaseHttpService {
  getProducts(page: number): Observable<IProduct[]> {
    return this.http
      .get<IProduct[]>(`${this.apiUrl}/products`, {
        params: {
          limit: page * LIMIT,
        },
      })
      .pipe(
        map((products) => {
          return products.slice(-LIMIT);
        }),
      );
  }

  getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.apiUrl}/products/${id}`);
  }
}
