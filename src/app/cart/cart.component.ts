import { Component, inject } from '@angular/core';
import { CartItemComponent } from './ui/cart-item/cart-item.component';
import { CartStateService } from '../shared/data-access';
import { IProductItemCart } from '../shared/interfaces';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartItemComponent, CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styles: ``,
})
export default class CartComponent {
  state = inject(CartStateService).state;

  onRemove(id: number) {
    this.state.removeFromCart(id);
  }

  onIncrease(item: IProductItemCart) {
    item.quantity += 1;
    this.state.updateQuantity(item);
  }

  onDecrease(item: IProductItemCart) {
    if (item.quantity > 1) {
      item.quantity -= 1;
    }
    this.state.updateQuantity(item);
  }
  get priceTotalProducts() {
    return this.state
      .price();
  }

  get taxes() {
    return this.priceTotalProducts * 0.21;
  }

  get storePickup() {
    return this.priceTotalProducts * 0.1;
  }

  get savings() {
    return this.priceTotalProducts * 0.05;
  }

  get totalCheckout() {
    return (
      this.priceTotalProducts + this.taxes + this.storePickup - this.savings
    );
  }
}
