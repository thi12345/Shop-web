import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IProduct } from './shared/models/product';
import { IPagination } from './shared/models/pagingation';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NavBarComponent } from './core/nav-bar/nav-bar.component';
import { ShopComponent } from './shop/shop.component';
import { PagingHeaderComponent } from './shared/components/paging-header/paging-header.component';
import { RouterOutlet } from '@angular/router';
import { SectionHeaderComponent } from "./core/section-header/section-header.component";
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BasketService } from './basket/basket.service';
import { AccountService } from './account/account.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule,
    CommonModule,
    NavBarComponent,
    ShopComponent,
    RouterOutlet, SectionHeaderComponent,
  SectionHeaderComponent,
  NgxSpinnerModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  products: IProduct[]=[];
  constructor(private basketService: BasketService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private accountService: AccountService
  ) { }
  ngOnInit(): void {
    
    this.loadBasket();
    this.loadCurrentUser();
  }
  loadCurrentUser(){
    // if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      // if(token){
        this.accountService.loadCurrentUser(token).subscribe(() =>{
          console.log('loaded user');
        },error =>{
          console.log(error);
        });
      // }
    // }
  }
  loadBasket(){
   
    // if(isPlatformBrowser(this.platformId)){
      const basketId = localStorage.getItem('basket_id');
      if (basketId) {
        this.basketService.getBasket(basketId).subscribe(() => {
          console.log('initialised basket');
   
        }, error => {
          console.log('eror basking loaded',error);
        })
      // }
    }
  }

}
