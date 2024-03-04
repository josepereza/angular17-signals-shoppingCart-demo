import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export interface Rating {
  rate: number;
  count: number;
}

export type LoadingStatus = 'loading' | 'success' | 'error';

export interface ProductState {
  products: Product[];
  status: LoadingStatus;
  errorMsg: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private baseUrl = 'https://fakestoreapi.com/products';

  // state
  private productState = signal<ProductState>({
    products: [],
    status: 'loading',
    errorMsg: null,
  });

  // selectors
  products = computed(() => this.productState().products);
  status = computed(() => this.productState().status);
  errorMsg = computed(() => this.productState().errorMsg);

  // sources
  products$ = this.fetchProducts();
  status$ = new Subject<LoadingStatus>();
  errorMsg$ = new Subject<string | null>();

  constructor() {
    // reducers
    this.products$.pipe(takeUntilDestroyed()).subscribe((products) =>
      this.productState.update((state) => ({
        ...state,
        products: products,
        status: 'success',
        errorMsg: null,
      }))
    );
  }

  private fetchProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }
}
