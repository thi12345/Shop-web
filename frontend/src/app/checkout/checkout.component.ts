import { Component, OnInit } from '@angular/core';
import { OrderTotalsComponent } from "../shared/components/order-totals/order-totals.component";
import { CommonModule } from '@angular/common';
import { StepperComponent } from '../shared/stepper/stepper.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CheckoutAddressComponent } from "./checkout-address/checkout-address.component";
import { CheckoutReviewComponent } from "./checkout-review/checkout-review.component";
import { CheckoutPaymentComponent } from "./checkout-payment/checkout-payment.component";
import { CheckoutDeliveryComponent } from './checkout-delivery/checkout-delivery.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { AccountService } from '../account/account.service';
import { BasketService } from '../basket/basket.service';
import { error } from 'node:console';


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CdkStepperModule,
    OrderTotalsComponent,
    CommonModule,
    StepperComponent,
    CheckoutAddressComponent,
    CheckoutReviewComponent,
    CheckoutPaymentComponent,
    CheckoutDeliveryComponent
],

  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  // checkoutForm!: FormGroup;
  constructor(private fb: FormBuilder, 
    private accountService : AccountService,
    private basketService: BasketService
  ) {}

  ngOnInit(): void {
    this.getAddressFormValue();
    // this.getDeliveryMethodValue();

  }
 
  checkoutForm = this.fb.group({
    addressForm: this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required]
    }),
    deliveryForm: this.fb.group({
      deliveryMethod: [null, Validators.required]
    }),
    paymentForm: this.fb.group({
      nameOnCard: [null, Validators.required]
    })
  })
  
  // getAddressFormValue() {
  //   this.accountService.getUserAddress().subscribe({
  //     next: address => {
  //       address && this.checkoutForm.get('addressForm')?.patchValue(address);
  //     }
  //   })
  // }

  getAddressFormValue() {
    this.accountService.getUserAddress().subscribe(address =>{
      if (address) {
        this.checkoutForm.get('addressForm')?.patchValue(address);
      }
    },error => {
      console.log(error);
    }
  );
  }


}
