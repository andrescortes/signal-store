import { Component, inject } from '@angular/core';
import { ProductsStateService } from '../../data-access';
import { ProductCardComponent } from '../../ui/product-card/product-card.component';
import { CartStateService } from '../../../shared/data-access';
import { IProduct } from '../../../shared/interfaces';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './product-list.component.html',
  styles: ``,
  providers: [ProductsStateService],
})
export default class ProductListComponent {
  readonly productsStateService = inject(ProductsStateService);
  cartStateService = inject(CartStateService);

  changePage() {
    const page = this.productsStateService.state.page() + 1;
    this.productsStateService.changePage$.next(page);
  }

  addProductToCart(product: IProduct) {
    this.cartStateService.state.addToCart({
      product,
      quantity: 1,
    });
  }
}
