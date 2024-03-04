import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Product, ProductService } from './data-access/product.service';
import { ProductListComponent } from './ui/product-list/product-list.component';
import { ProductDetailsComponent } from './ui/product-details/product-details.component';
import { CartItem, CartService } from '../cart/data-access/cart.service';

@Component({
  selector: 'app-products',
  standalone: true,
  template: `
    <div class="container-fluid">
      <div class="row">
        <div class="col-6">
          <app-product-list
            [products]="products()"
            (productSelected)="onProductSelected($event)"
          />
        </div>
        <div class="col-6">
          @if (selectedProduct()) {
          <app-product-details
            [selectedProduct]="selectedProduct()"
            (addToCart)="onItemAdded($event)"
          />
          } @else {
          <p>Select product to see details.</p>
          }
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ProductListComponent, ProductDetailsComponent],
})
export class ProductsComponent {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  products = this.productService.products;
  selectedProduct = signal<Product | null>(null);

  onProductSelected(selectedProduct: Product): void {
    if (selectedProduct) {
      this.selectedProduct.set(selectedProduct);
    }
  }

  onItemAdded(producto:CartItem): void {
    this.cartService.addToCart({ item: producto.item, quantity:producto.quantity });
  }
}
