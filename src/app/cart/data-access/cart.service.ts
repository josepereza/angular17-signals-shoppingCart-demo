import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../../products/data-access/product.service';

export interface CartState {
  cartItems: CartItem[];
}

export interface CartItem {
  item: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartState = signal<CartState>({
    cartItems: [],
  });

  // selectors
  totalQty = computed(() => this.cartState().cartItems.length);
  cartTotal = computed(() => {
    return this.cartState().cartItems.reduce((acc, cartItem) => acc + cartItem.item.price * cartItem.quantity, 0);
  });
  constructor() {}

  addToCart(cartItem: CartItem): void {
    this.cartState.update((cartState) => ({
      ...cartState,
      cartItems: [...cartState.cartItems, cartItem],
    }));
  }
}
