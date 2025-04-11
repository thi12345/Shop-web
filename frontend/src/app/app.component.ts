import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IProduct } from './shared/models/product';
import { IPagination } from './shared/models/pagingation';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './core/nav-bar/nav-bar.component';
import { ShopComponent } from './shop/shop.component';
import { PagingHeaderComponent } from './shared/components/paging-header/paging-header.component';
import { RouterOutlet } from '@angular/router';
import { SectionHeaderComponent } from "./core/section-header/section-header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule,
    CommonModule,
    NavBarComponent,
    ShopComponent,
    RouterOutlet, SectionHeaderComponent,
  SectionHeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  products: IProduct[]=[];
  constructor() { }
  ngOnInit(): void {

  }

}
