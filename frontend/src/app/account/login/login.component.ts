import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from '../../core/text-input/text-input.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  returnUrl!: string ;
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/shop';
    this.createLoginForm();
  }
  createLoginForm(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators
        .pattern('^[\\w\\.=-]+@[\\w\\.-]+\\.[\\w]{2,3}$')]],
      password: ['', Validators.required]
    });
  }
  onSubmit(){
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); // Đánh dấu tất cả controls để hiện lỗi
      return;
    }

    this.accountService.login(this.loginForm.value).subscribe(() =>{
      this.router.navigateByUrl(this.returnUrl);
    }, error =>{
      console.log(error);
    });
  }
}
