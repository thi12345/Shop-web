import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { TextInputComponent } from '../../core/text-input/text-input.component';
import { CommonModule } from '@angular/common';
import { map, of, switchMap, timer } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errors: string[] = [];

  constructor( private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(){
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      displayName: [null, [Validators.required]],
      email: [null,
        [Validators.required, Validators.pattern('^[\\w\\.=-]+@[\\w\\.-]+\\.[\\w]{2,3}$')],
        [this.ValidateEmailNotTaken()]],
      password: [null,[Validators.required]],
    });
  }

  onSubmit() {
    this.accountService.register(this.registerForm.value).subscribe(response => {
      this.router.navigateByUrl('/shop');
    }, error => {
      console.log(error);
      this.errors = error.erros;
    });
  }

  ValidateEmailNotTaken():AsyncValidatorFn{
    return control =>{
      return timer(500).pipe(
        switchMap(() => {
          if(!control.value){
            return of(null);
          }
          return this.accountService.checkEmailExist(control.value).pipe(
              map(res => {
         
                return res ? {emailExists: true} : null;
              }),
            
          )
        })
      )
    }
  }

}
