import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CartService } from './data-access/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>cart works!</p>
  <div class="container mt-5">
  <div *ngIf="cartService.cartState().cartItems.length" class="CartContainer mx-auto">
    <div class="Header">
      <h3 class="Heading">Shopping Cart</h3>
    </div>

    <ng-container *ngFor="let row of cartService.cartState().cartItems; let i = index">
      <div class="row">
        <div class="col-1">
          <img [src]="row.item.image" style="width: 100%" />
        </div>
        <div class="col-6">
          <h3 class="title">{{ row.item.title }}</h3>
          <p>{{ row.item.description }}</p>
        </div>
        <p>{{ row.quantity }}</p>
        <div class="col-1">
        
        </div>
        <!-- <div class="col-md-1 d-flex align-items-center justify-content-between">
            <div class="btn">+</div>
            <div class="count">2</div>
            <div class="btn">-</div>
          </div> -->
        <div class="col-2 end">
          <div class="amount">{{ row.item.price | currency }}</div>
          <div class="save"><u>Save for later</u></div>
          <div (click)="remove(row.item.id)" class="remove"><u>Remove</u></div>
        </div>
      </div>
    </ng-container>

    <hr />
    <div class="checkout">

      <div class="total">
        <div>
          <div class="Subtotal">Sub-Total</div>
          <div class="items">2 items</div>
        </div>
        <div class="total-amount">{{cartService.cartTotal() }}</div>
      </div>
      <button class="btn btn-success">Checkout</button>
    </div>
  </div>
  <a class="btn btn-primary" routerLink="/productos" routerLinkActive="router-link-active" >Regresar</a>

  <ng-template #noItem>
    <h1>Cart is Empty</h1>
  </ng-template>
</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent { 

  cartService=inject (CartService)
  remove(id:number){}
}
