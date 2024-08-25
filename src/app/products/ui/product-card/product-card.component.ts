import { Component, input, output } from '@angular/core';
import { IProduct } from '../../../shared/interfaces';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
  styles: ``,
})
export class ProductCardComponent {
  product = input.required<IProduct>();
  addToCart = output<IProduct>();

  add(event: Event): void {
    event.stopImmediatePropagation();
    event.preventDefault();

    this.addToCart.emit(this.product());
  }
}
