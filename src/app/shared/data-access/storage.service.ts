import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IProductItemCart } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  loadProducts(): Observable<IProductItemCart[]> {
    const rawProducts = localStorage.getItem('products');
    return of(rawProducts ? JSON.parse(rawProducts) : []);
  }

  saveProducts(products: IProductItemCart[]): void {
    localStorage.setItem('products', JSON.stringify(products));
  }
}
