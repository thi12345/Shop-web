import { Component, Input } from '@angular/core';
import { BasketSummaryComponent } from '../../shared/components/basket-summary/basket-summary.component';
import { CdkStepper, CdkStepperNext, CdkStepperPrevious } from '@angular/cdk/stepper';
import { BasketService } from '../../basket/basket.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout-review',
  standalone: true,
  imports: [BasketSummaryComponent, CdkStepperNext, CdkStepperPrevious],
  templateUrl: './checkout-review.component.html',
  styleUrl: './checkout-review.component.css'
})
export class CheckoutReviewComponent {

  @Input() appStepper?: CdkStepper;
  constructor(private basketService: BasketService, private toastr: ToastrService) {}
  // createPaymentIntent() {
  //   this.basketService.createPaymentIntent().subscribe({
  //     next: () => {
  //       this.appStepper?.next();
  //     },
  //     error: error => this.toastr.error(error.message)
  //   })
  // }
}
