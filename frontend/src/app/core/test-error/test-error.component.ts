import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-test-error',
  standalone: true,
  imports: [HttpClientModule],
  
  templateUrl: './test-error.component.html',
  styleUrl: './test-error.component.css'
})
export class TestErrorComponent implements OnInit {
  baseUrl= environment.apiUrl;
  constructor( private http: HttpClient){}
  ngOnInit(): void {

  }
  get404Error(){
    this.http.get(this.baseUrl + 'products/42').subscribe(
      response => {
        console.log(response);
      },
    // (error: any) =>{
    //     console.log(error);
    //   }
     );
    
  }
  get500Error() {
    this.http.get(this.baseUrl + 'buggy/servererror').subscribe(
      response => {
        console.log(response);
      }, 
      // (error: any) => {
      //   console.log(error);
      // }
    );
  }
  get400Error() {
    this.http.get(this.baseUrl + 'buggy/badrequest').subscribe(
      response => {
        console.log(response);
      }, 
      // (error: any) => {
      //   console.log(error);
      // }
    );
  }
  get400ValidationError() {
    this.http.get(this.baseUrl + 'buggy/badrequest/fortytwo').subscribe(
      response => {
        console.log(response);
      },
      //  (error: any) => {
      //   console.log(error);
      // }
    );
  }

}
