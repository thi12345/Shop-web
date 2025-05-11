import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../../account/account.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { CdkStep, CdkStepperNext, CdkStepperPrevious } from '@angular/cdk/stepper';

@Component({
  selector: 'app-checkout-address',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule , CdkStepperNext],
  templateUrl: './checkout-address.component.html',
  styleUrl: './checkout-address.component.css'
})
export class CheckoutAddressComponent {
  @Input() checkoutForm?: FormGroup;

  constructor(private accountService: AccountService, private toastr: ToastrService) {}

  saveUserAddress() {
    this.accountService.updateUserAddress(this.checkoutForm?.get('addressForm')?.value).subscribe({
      next: () => {
        this.toastr.success('Address saved');
        this.checkoutForm?.get('addressForm')?.reset(this.checkoutForm?.get('addressForm')?.value);
      }
    })
  }
  onSubmit() {}
}
