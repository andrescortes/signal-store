import { Component, input, output } from '@angular/core';
import { IProductItemCart } from '../../../shared/interfaces';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
})
export class CartItemComponent {
  productCartItem = input.required<IProductItemCart>();
  onRemove = output<number>();
  onIncrease = output<IProductItemCart>();
  onDecrease = output<IProductItemCart>();

  get totalPrice() {
    return (
      this.productCartItem().product.price * this.productCartItem().quantity
    );
  }
}
