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

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="list-group">
      @for (product of products; track product.id) {
      <button
        type="button"
        class="list-group-item list-group-item-action"
        [ngClass]="{ active: product.id === selectedProduct()?.id }"
        (click)="selectProduct(product)"
      >
        {{ product.title }}
      </button>
      } @empty {
      <p>No products!</p>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  @Input({ required: true }) products!: Product[];
  @Output() productSelected = new EventEmitter<Product>();
  selectedProduct = signal<Product | null>(null);

  selectProduct(product: Product): void {
    this.selectedProduct.set(product);
    this.productSelected.emit(product);
  }
}
