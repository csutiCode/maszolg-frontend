import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { Messages } from '../components/utils/messages';
import { RestService } from './rest.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URL = Messages.baseLocalUrl

  visible: boolean;

  listedAccount: any;

  token?: string;

  response?: any;

  error?: any;

  status?: number = 200;

  reqHeaders = new HttpHeaders({ 
    'Content-Type': 'application/JSON',
    'Access-Control-Allow-Credentials': 'true',
    "Access-Control-Allow-Origin": "*",
     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
 });


  reqHeaderAuth =   new HttpHeaders({ 
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
        private restService: RestService,
        private sanitizer: DomSanitizer) {
        //this hides the navbar if somebody logged in
        this.visible = true; 
          if (this.getToken()!=null) {
            this.visible = false; 
        }
   }

   public register(registerRequest: any) {
    
    this.http.post(URL + "account/createAccount", registerRequest, { headers: this.reqHeaders })
      .subscribe(
        (data:any)=> {
          this.response = data,
          //this.status = this.response.status,
            console.log("message from backend: ")
            console.log(this.response)
          }, (error: any) => {
            console.table(error),
            console.log('HTTP Error status code: ', error.error),
            this.response = error.error,
            this.status = error.status
        }
      )

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
          //hide the navbar
          //get the listedAccount and make a redirect
          this.getListedAccount();
          
          
      }
    )
  }

   getListedAccount() {
    this.http.get(URL + "auth",  { headers: this.reqHeaderAuth }).subscribe(
      (data:any)=> {
        this.listedAccount = data,
        this.router.navigate(['loggedIn'], { queryParams: { uuid: this.listedAccount?.listedAccount_uuid} })
        this.hide();
      }
    ) 
  }
   

   public saveListedAccount(form : any) {
         this.http.post(URL + "auth/save/listedAccount", form,  { headers: this.reqHeaderAuth }).subscribe(
          (data:any)=> {
            this.listedAccount = data,
            console.log(this.listedAccount)  
        }
      )
   }

   public sendComment(commentOnClassificationDto : any) {
    console.log(commentOnClassificationDto)
      this.http.post(URL + "auth/save/commentOnClassification", commentOnClassificationDto,  { headers: this.reqHeaderAuth }).subscribe(
        (data:any)=> {
          this.response = data,
          console.log(this.response)
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
