import { Route, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem } from '../shared/models/basket';
import { BasketService } from './basket.service';
import { CommonModule } from '@angular/common';
import { OrderTotalsComponent } from "../shared/components/order-totals/order-totals.component";
import { BasketSummaryComponent } from '../shared/components/basket-summary/basket-summary.component';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [CommonModule, RouterModule, OrderTotalsComponent, BasketSummaryComponent],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css'
})
export class BasketComponent implements OnInit {
  basket$!: Observable<IBasket | null>
  constructor(private basketService: BasketService){}
  ngOnInit() {
    this.basket$ = this.basketService.basket$;
    console.log(this.basket$);
  }
  removeBasketItem(item: IBasketItem){
    this.basketService.removeItemFromBasket(item);
  }
  incrementItemQuantity(item: IBasketItem){
    this.basketService.incrementItemQuantity(item);
  }
  decrementItemQuantity(item: IBasketItem){
    this.basketService.decrementItemQuantity(item);
  }
  
}
