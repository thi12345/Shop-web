// jwt.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AccountService } from '../../account/account.service';
import { switchMap, take } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const accountService = inject(AccountService);

  return accountService.currentUser$.pipe(
    take(1),
    switchMap(user => {
      if (user?.token) {
        const cloned = req.clone({
          setHeaders: { Authorization: `Bearer ${user.token}` }
        });
        return next(cloned);
      }
      return next(req);
    })
  );
};
