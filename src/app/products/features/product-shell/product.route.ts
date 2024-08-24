import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('../product-list/product-list.component'),
  },
  {
    path: ':id',
    loadComponent: () => import('../produc-detail/produc-detail.component'),
  },
] as Routes;
