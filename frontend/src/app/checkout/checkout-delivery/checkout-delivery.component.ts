import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutService } from '../checkout.service';
import { IDeliveryMethod } from '../../shared/models/deliveryMethod';
import { CommonModule } from '@angular/common';
import { BasketService } from '../../basket/basket.service';
import { CdkStepperNext, CdkStepperPrevious } from '@angular/cdk/stepper';

@Component({
  selector: 'app-checkout-delivery',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, FormsModule, CdkStepperPrevious, CdkStepperNext],
  templateUrl: './checkout-delivery.component.html',
  styleUrl: './checkout-delivery.component.css'
})
export class CheckoutDeliveryComponent implements OnInit {
  @Input () checkoutForm?: FormGroup;
  deliveryMethods: IDeliveryMethod[] = [];

  constructor(private checkoutService: CheckoutService,
    private basketService: BasketService
  ) {}
  ngOnInit(): void {
    this.checkoutService.getDeliveryMethods().subscribe((dm: IDeliveryMethod[]) => {
      this.deliveryMethods = dm;
    }, error => {
      console.log(error);
    });
  }
  setShippingPrice(deliveryMethod: IDeliveryMethod) {
    this.basketService.setShippingPrice(deliveryMethod);
  }
}
