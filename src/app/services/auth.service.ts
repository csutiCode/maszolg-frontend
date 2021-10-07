import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { RestService } from './rest.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  visible: boolean;

  listedAccount: any;

  token?: string;

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
        private http: HttpClient,
        private restService: RestService) {
        //this hides the navbar if somebody logged in
        this.visible = true; 
          if (this.getToken()!=null) {
            this.visible = false; 
        }
   }

   public login(loginForm : any) {
    console.log("loginform value from the authservice: ")
    console.table(loginForm.value)
      this.restService.post("account/login", loginForm.value).subscribe(
        (data:any)=> {
          this.token = data,
          console.log(this.token)
          //set the token as cookie -> works
          this.cookieService.put("JWT", this.token);
          
          this.hide();
          this.getListedAccount();
          
      }
    )
     
   }

   getListedAccount() {
    this.http.get("http://localhost:8080/auth",  { headers: this.reqHeader }).subscribe(
      (data:any)=> {
        this.listedAccount = data,
        this.router.navigate(['loggedIn'], { queryParams: { uuid: this.listedAccount?.listedAccount_uuid} })
      }
    ) 
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
