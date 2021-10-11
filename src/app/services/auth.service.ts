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

  //TODO: SOMEHOW DOESN'T WORK
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
 

  reqHeaderImage =   new HttpHeaders({ 
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

   public register(registerRequest: any) {
    
    return this.http.post("http://localhost:8080/account/createAccount", registerRequest, { headers: this.reqHeaders }).toPromise();
       
   }

 
   public login(loginForm : any) {
    const promise = this.restService.post("account/login", loginForm.value,  { headers: this.getHttpHeaderAuth() }).toPromise();
    let self = this;
    promise.then((data:any)=> {
          this.token = data,
          console.log(this.token)
          this.cookieService.put("JWT", this.token);
          //hide the navbar
          //get the listedAccount and make a redirect
          self.getListedAccount(self);
      }
    )
  }

  

   getListedAccount(self : AuthService = this) {
    
     console.log("TOKEN from the getlistedaccount:  ")
     console.log(self.token)
     self.http.get("http://localhost:8080/auth",  { headers: self.getHttpHeaderAuth() }).subscribe(
      (data:any)=> {
        self.listedAccount = data,
        self.router.navigate(['loggedIn'], { queryParams: { uuid: self.listedAccount?.listedAccount_uuid} })
        self.hide();
      }
    ) 
  }
   

   public saveListedAccount(form : any) {
         this.http.post("http://localhost:8080/auth/save/listedAccount", form,  { headers: this.getHttpHeaderAuth() }).subscribe(
          (data:any)=> {
            this.listedAccount = data,
            console.log(this.listedAccount)  
        }
      )
   }

   public sendComment(commentOnClassificationDto : any) {
    console.log(commentOnClassificationDto)
      this.http.post("http://localhost:8080/auth/save/commentOnClassification", commentOnClassificationDto,  { headers: this.getHttpHeaderAuth() }).subscribe(
        (data:any)=> {
          this.response = data,
          console.log(this.response)
        }
      )
   }


   uploadImage(uuid : string | null, formData: any) {
    return this.http.post("http://localhost:8080/auth/uploadImage/"+ uuid, formData,  { headers: this.reqHeaderImage }).toPromise();
    }

    delete(uuid: string | null) {
      this.http.get("http://localhost:8080/auth/delete/" + uuid,  { headers: this.getHttpHeaderAuth() }).subscribe(
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


  getHttpHeaderAuth(): HttpHeaders {
    const reqHeaderAuth =   new HttpHeaders({ 
      'Authorization': 'Bearer ' + this.cookieService.get("JWT"),
      'Content-Type': 'application/json', 
      'Access-Control-Allow-Credentials': 'true',
      "Access-Control-Allow-Origin": "http://localhost:8080/*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    });

    return reqHeaderAuth;
  }






}
