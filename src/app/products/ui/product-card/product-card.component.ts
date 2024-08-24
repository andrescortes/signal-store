import { Component, input, Input } from '@angular/core';
import { IProduct } from '../../../shared/interfaces';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styles: ``,
})
export class ProductCardComponent {
  product = input.required<IProduct>();

  constructor() {
  }
}
