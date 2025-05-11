import { CdkStepper, CdkStepperNext, CdkStepperPrevious } from '@angular/cdk/stepper';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasketService } from '../../basket/basket.service';
import { CheckoutService } from '../checkout.service';
import { ToastrService } from 'ngx-toastr';
import { NavigationExtras, Router, RouterModule } from '@angular/router';
import { IBasket } from '../../shared/models/basket';
import { IOrder, IOrderToCreate } from '../../shared/models/order';
import { IAddress } from '../../shared/models/address';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import {loadStripe, Stripe, StripeCardCvcElement, StripeCardExpiryElement, StripeCardNumberElement} from '@stripe/stripe-js';
import { error } from 'console';


@Component({
  selector: 'app-checkout-payment',
  standalone: true,
  imports: [CommonModule, CdkStepperPrevious, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './checkout-payment.component.html',
  styleUrl: './checkout-payment.component.css'
})
export class CheckoutPaymentComponent implements OnInit {
  @Input() checkoutForm?: FormGroup;
  // @ViewChild('cardNumber') cardNumberElement?: ElementRef;
  // @ViewChild('cardExpiry') cardExpiryElement?: ElementRef;
  // @ViewChild('cardCvc') cardCvcElement?: ElementRef;
  // stripe: Stripe | null = null;
  // cardNumber?: StripeCardNumberElement;
  // cardExpiry?: StripeCardExpiryElement;
  // cardCvc?: StripeCardCvcElement;
  // cardNumberComplete = false;
  // cardExpiryComplete = false;
  // cardCvcComplete = false;
  // cardErrors: any;
    loading = true;



  // constructor(private basketService: BasketService,
  //   private checkoutService: CheckoutService,
  //   private toastr: ToastrService,
  //   private router: Router
  // ) { }
  // ngOnInit(): void {
  //   loadStripe('pk_test_2PZ84pFKu2MddUgGDG521v9m00SlLWySIR').then(stripe => {
  //     this.stripe = stripe;
  //     const elements = stripe?.elements();
  //     if (elements) {
  //       this.cardNumber = elements.create('cardNumber');
  //       this.cardNumber.mount(this.cardNumberElement?.nativeElement);
  //       this.cardNumber.on('change', event => {
  //         this.cardNumberComplete = event.complete;
  //         if (event.error) this.cardErrors = event.error.message;
  //         else this.cardErrors = null;
  //       })

  //       this.cardExpiry = elements.create('cardExpiry');
  //       this.cardExpiry.mount(this.cardExpiryElement?.nativeElement);
  //       this.cardExpiry.on('change', event => {
  //         this.cardExpiryComplete = event.complete;
  //         if (event.error) this.cardErrors = event.error.message;
  //         else this.cardErrors = null;
  //       })

  //       this.cardCvc = elements.create('cardCvc');
  //       this.cardCvc.mount(this.cardCvcElement?.nativeElement);
  //       this.cardCvc.on('change', event => {
  //         this.cardCvcComplete = event.complete;
  //         if (event.error) this.cardErrors = event.error.message;
  //         else this.cardErrors = null;
  //       })
  //     }
  //   })
  // }
  

  // get paymentFormComplete() {
  //   return this.checkoutForm?.get('paymentForm')?.valid 
  //     && this.cardNumberComplete 
  //     && this.cardExpiryComplete 
  //     && this.cardCvcComplete
  // }

  // async submitOrder() {
  //   this.loading = true;
  //   const basket = this.basketService.getCurrentBasketValue();
  //   if (!basket) throw new Error('cannot get basket');
  //   try {
  //     const createdOrder = await this.createOrder(basket);
  //     const paymentResult = await this.confirmPaymentWithStripe(basket);
  //     if (paymentResult.paymentIntent) {
  //       this.basketService.deleteBasket(basket);
  //       const navigationExtras: NavigationExtras = {state: createdOrder};
  //       this.router.navigate(['checkout/success'], navigationExtras);
  //     } else {
  //       this.toastr.error(paymentResult.error.message);
  //     }
  //   } catch (error: any) {
  //     console.log(error);
  //     this.toastr.error(error.message)
  //   } finally {
  //     this.loading = false;
  //   }
  // }

  // private async confirmPaymentWithStripe(basket: IBasket | null) {
  //   if (!basket) throw new Error('Basket is null');
  //   const result = this.stripe?.confirmCardPayment(basket.clientSecret!, {
  //     payment_method: {
  //       card: this.cardNumber!,
  //       billing_details: {
  //         name: this.checkoutForm?.get('paymentForm')?.get('nameOnCard')?.value
  //       }
  //     }
  //   });
  //   if (!result) throw new Error('Problem attempting payment with stripe');
  //   return result;
  // }

  // private async createOrder(basket: IBasket | null) {
  //   if (!basket) throw new Error('Basket is null');
  //   const orderToCreate = this.getOrderToCreate(basket);
  //   return firstValueFrom(this.checkoutService.createOrder(orderToCreate));
  // }

  // private getOrderToCreate(basket: IBasket): IOrderToCreate {
  //   const deliveryMethodId = this.checkoutForm?.get('deliveryForm')?.get('deliveryMethod')?.value;
  //   const shipToAddress = this.checkoutForm?.get('addressForm')?.value as IAddress;
  //   if (!deliveryMethodId || !shipToAddress) throw new Error('Problem with basket');
  //   return {
  //     basketId: basket.id,
  //     deliveryMethodId: deliveryMethodId,
  //     shipToAddress: shipToAddress
  //   }
  // }
  constructor(private basketService: BasketService,
    private checkoutService: CheckoutService,
    private toastr: ToastrService,
    private router: Router
  ) { }
  ngOnInit(): void {
  }
  submitOrder() {
      const basket = this.basketService.getCurrentBasketValue();
      const orderToCreate = this.getOrderToCreate(basket);
      this.checkoutService.createOrder(orderToCreate).subscribe((order: IOrder) => {
        this.toastr.success('Order created successfully');
        if (basket) this.basketService.deleteBasket(basket);
        
        const navigationExtras: NavigationExtras = { state: order };  
        this.router.navigate(['checkout/success'], navigationExtras);
      }, error => {
        console.log(error);
      } );
  }
  private getOrderToCreate(basket: IBasket | null) {
    if (!basket) throw new Error('Basket is null');
    const deliveryMethodId = this.checkoutForm?.get('deliveryForm')?.get('deliveryMethod')?.value;
    const shipToAddress = this.checkoutForm?.get('addressForm')?.value as IAddress;

    if (!deliveryMethodId || !shipToAddress) throw new Error('Problem with basket');

    return {
      basketId: basket.id,
      deliveryMethodId: deliveryMethodId,
      shipToAddress: shipToAddress
    }
  }
}
