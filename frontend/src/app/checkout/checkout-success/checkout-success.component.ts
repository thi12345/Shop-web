import { Component, OnInit } from '@angular/core';
import { IOrder } from '../../shared/models/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-success',
  standalone: true,
  imports: [],
  templateUrl: './checkout-success.component.html',
  styleUrl: './checkout-success.component.css'
})
export class CheckoutSuccessComponent implements OnInit {
  order!: IOrder;
  constructor(private router: Router) { 
    const navigation = this.router.getCurrentNavigation();
    const state = navigation && navigation.extras && navigation.extras.state;
    if (state){
      this.order = state as IOrder ;
    }
  }

  ngOnInit(): void {
  }
}
