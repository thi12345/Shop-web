import { IUser } from './../shared/models/user';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map, of, ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';
import { IAddress } from '../shared/models/address';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<IUser | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  // getCurrentUserValue(){
  //   return this.currentUserSource.value;
  // }

  loadCurrentUser(token: string | null){
    if (token === null) {
      this.currentUserSource.next(null);
      return of(null);
    }
    
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get<IUser>(this.baseUrl + 'account', {headers}).pipe(
      map((user: IUser) => {
        if (user){
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
          return user;
        }
        else {
          this.currentUserSource.next(null);
          return null; // ✅ explicitly return null
        }
      })
    )
  }
  login(values: any){
    return this.http.post<IUser>(this.baseUrl + 'account/login', values).pipe(
      map((user: IUser) => {
        if (user){
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }

  register(values: any){
    return this.http.post<IUser>(this.baseUrl + 'account/register', values).pipe(
      map((user: IUser) => {
        if (user){
          localStorage.setItem('token', user.token);

        }
      })
    )
  }

  logout(){
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }

  checkEmailExist(email: string){
    return this.http.get(this.baseUrl + 'account/emailexist?email=' + email)
  }

  getUserAddress() {
    return this.http.get<IAddress>(this.baseUrl + 'account/address');
  }
 
  updateUserAddress(address: IAddress) {
    return this.http.put<IAddress>(this.baseUrl + 'account/address', address);
  }
}
