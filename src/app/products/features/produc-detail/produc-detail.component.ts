import { Component, effect, inject, input } from '@angular/core';
import { ProductDetailStateService } from '../../data-access/product-detail-state.service';
import { CurrencyPipe } from '@angular/common';
import { IProduct } from '../../../shared/interfaces';
import { CartStateService } from '../../../shared/data-access';

@Component({
  selector: 'app-produc-detail',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './produc-detail.component.html',
  styles: ``,
})
export default class ProducDetailComponent {
  readonly productDetailService = inject(ProductDetailStateService).state;
  readonly state = inject(CartStateService).state;
  id = input.required<number>();

  constructor() {
    effect(() => {
      this.productDetailService.getbyId(this.id());
    });
  }

  addToCart(product: IProduct | null): void {
    if (product) {
      this.state.addToCart({ product, quantity: 1 });
    }
  }
}
