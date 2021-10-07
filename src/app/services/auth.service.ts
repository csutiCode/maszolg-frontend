import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { BehaviorSubject } from 'rxjs';
import { BooleanLiteral } from 'typescript';
import { FormGroup} from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  visible: boolean;

  listedAccount: any;

  reqHeader =   new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.cookieService.get("JWT"),
    'Access-Control-Allow-Credentials': 'true',
    "Access-Control-Allow-Origin": "http://localhost:8080/*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
  });


  constructor(private cookieService: CookieService,
        private router: Router,
        private http: HttpClient) {
    //this hides the navbar if somebody logged in
      this.visible = true; 
      if (this.getToken()!=null) {
        this.visible = false; 
      }
   }


   public saveListedAccount(form : any) {
         this.http.post("http://localhost:8080/auth/save/listedAccount", form.value,  { headers: this.reqHeader }).subscribe(
          (data:any)=> {
            this.listedAccount = data,
            console.log(this.listedAccount)  
        }
      )
   }



  getToken(): string {
    console.log("Token from getToken: " + this.cookieService.get("JWT"));
    return this.cookieService.get("JWT");
  }

  hide() { this.visible = false; }

  show() { this.visible = true; }

  toggle() { this.visible = !this.visible; }






}
