import { error } from 'console';
// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
// import { Injectable } from "@angular/core";
// import { Router } from "@angular/router";
// import { catchError, Observable, throwError } from "rxjs";


// @Injectable()

// export class ErrorInterceptor implements HttpInterceptor{

// constructor(private router: Router){}

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     return next.handle(req).pipe(
//       catchError(error =>{
//         if (error){
//           if (error.status === 404){
//             this.router.navigateByUrl('/notfound');
//           }
//           else if(error.status === 500){
//             this.router.navigateByUrl('server-error');
//           }
//         }
//         return throwError(error);
//       })
//     )
//   }

// }
// core/interceptors/error.interceptor.ts


import { HttpInterceptorFn } from '@angular/common/http';
import { inject, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const zone = inject(NgZone);
  
  return next(req).pipe(
    catchError(error => {
      console.log('reeeeeeeeeeeeeeeeeeeeeeee');
      if(error.status === 400){
      }
      if (error.status === 404) {
         router.navigateByUrl('/notfound');
      }
      if (error.status === 500) {
        router.navigateByUrl('/server-error');
      }
      return throwError(() => error);
    })
  );
};
