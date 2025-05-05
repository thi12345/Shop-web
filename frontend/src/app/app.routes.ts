import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { ProductDetailsComponent } from './shop/product-details/product-details.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { authGuard } from './core/guards/auth.guard';
import { skip } from 'rxjs';

export const routes: Routes = [
  { path: '', component: HomeComponent, data: { breadcrumb: 'Home' } },
  {path: 'shop' ,
    data: { breadcrumb: 'Shop' },
    children:[
      {
        path: '',
        loadComponent: () =>
          import('./shop/shop.component')
            .then(m => m.ShopComponent),
      },
      {
        path: ':id',
        loadComponent: () =>
            import('./shop/product-details/product-details.component')
              .then(m => m.ProductDetailsComponent),
        data: { breadcrumb: {alias: 'productDetails'} }
      }
    ]


  },
  {
    path: 'basket',
    data: { breadcrumb: 'Basket' },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./basket/basket.component')
            .then(m => m.BasketComponent),
      },
      // {
      //   path: ':id',
      //   loadComponent: () =>
      //     import('./shop/product-details/product-details.component')
      //       .then(m => m.ProductDetailsComponent),
      //   data: { breadcrumb: { alias: 'productDetails' } }
      // }
    ],



  },
  {
    path: 'checkout',
    canActivate: [authGuard],
    data: { breadcrumb: 'Checkout' },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./checkout/checkout.component')
            .then(m => m.CheckoutComponent),
      },
    ]
  },
  // {path: 'shop/:id',
  //   loadComponent: () =>
  //     import('./shop/product-details/product-details.component')
  //       .then(m => m.ProductDetailsComponent),
  //   data: { breadcrumb: {alias: 'productDetails'} }
  // },
  {path: 'test-error', component: TestErrorComponent},
  {path: 'server-error',
    loadComponent: ()=>
      import ('./core/server-error/server-error.component')
    .then(m=>m.ServerErrorComponent)
  },
  {path: 'notfound', component: LoginComponent
  },
  {
    path: 'account',
    data: { breadcrumb: {skip:true} },
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./account/login/login.component')
            .then(m => m.LoginComponent),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./account/register/register.component')
            .then(m => m.RegisterComponent),
      }
    ]
  },

  {path: '**', redirectTo: 'notfound', pathMatch: 'full'}
];

