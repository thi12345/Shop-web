import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasketTotals } from '../../models/basket';
import { BasketService } from '../../../basket/basket.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-totals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-totals.component.html',
  styleUrl: './order-totals.component.css'
})
export class OrderTotalsComponent implements OnInit {
  basketTotal$: Observable<IBasketTotals | null> = this.basketService.basketTotal$;

  constructor(private basketService: BasketService){}
  ngOnInit() {
    this.basketTotal$ = this.basketService.basketTotal$;
  }
}
