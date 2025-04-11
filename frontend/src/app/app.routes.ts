import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { ProductDetailsComponent } from './shop/product-details/product-details.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';

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
  {path: 'notfound',
    loadComponent: ()=>
      import('./core/not-found/not-found.component')
      .then(m => m.NotFoundComponent)
  },
  {path: '**', redirectTo: 'notfound', pathMatch: 'full'}
];

