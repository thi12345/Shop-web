import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { delay, finalize, Observable } from "rxjs";
import { BusyService } from "../services/busy.service";
import { inject, Injectable } from "@angular/core";



export const loadingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn) : Observable<HttpEvent<any>> =>{
  const busyService = inject(BusyService);
  busyService.busy();
  return next(req).pipe(
    delay(1000),
    finalize(() => {
      busyService.idle();
    })
  );
  };

// {

//   constructor(private busyService: BusyService){}

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//       this.busyService.busy();
//       return next.handle(req).pipe(
//         delay(1000),
//         finalize(
//           ()=>{
//             this.busyService.idle();
//           }
//         )
//       );
//   }

// }
