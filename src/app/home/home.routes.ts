import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'products',
        loadComponent: () =>
          import('../products/products.component').then(
            (c) => c.ProductsComponent
          ),
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('../cart/cart.component').then((c) => c.CartComponent),
      },
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full',
      },
    ],
  },
];
