import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../cart/data-access/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="row">
      <nav class="navbar navbar-expand-sm bg-body-tertiary">
        <div class="container">
          <a class="navbar-brand">Signals Shopping Cart</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <a
                routerLink="products"
                routerLinkActive="active"
                class="nav-link"
                >Products
              </a>
              <a routerLink="cart" routerLinkActive="active" class="nav-link"
                >Cart
                <span class="badge bg-primary">{{ totalQuantity() }}</span>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <div class="container">
      <div class="row mt-3">
        <router-outlet />
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private cartService = inject(CartService);
  totalQuantity = this.cartService.totalQty;
}
