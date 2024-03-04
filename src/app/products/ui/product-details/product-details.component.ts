import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
} from '@angular/core';
import { Product } from '../../data-access/product.service';
import { CartItem } from '../../../cart/data-access/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <div class="card-header">
        <h5>{{ selectedProduct?.title }}</h5>
      </div>
      <div class="card-body">
        <div class="row align-items-center">
          <div class="col-3">
            <img
              class="img-thumbnail object-fit-cover border rounded"
              [src]="selectedProduct?.image"
            />
          </div>
          <div class="col-5">
            <select class="form-select" (change)="selectionChange($event)">
              @for (qty of quantity(); track qty) {
              <option [value]="qty">{{ qty }}</option>
              }
            </select>
          </div>
          <div class="col-4">
            <button class="btn btn-success" (click)="addProductToCart()">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent {
  @Input({ required: true }) selectedProduct!: Product | null;
  @Output() addToCart = new EventEmitter<CartItem>();
  quantity = signal([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  selectedQuantity = signal(1);

  selectionChange(event: Event) {
    this.selectedQuantity.set(
      parseInt((event?.target as HTMLInputElement)?.value)
    );
  }

  addProductToCart() {
    if (this.selectedProduct) {
      this.addToCart.emit({item:this.selectedProduct,quantity:this.selectedQuantity()});
    }
  }
}
