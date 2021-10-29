import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { RestService } from './rest.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //TODO: SOMEHOW DOESN'T WORK
  URL: string = "http://magyszolg-env.eba-vekatrk3.eu-west-2.elasticbeanstalk.com/";

  visible: boolean;

  listedAccount: any;

  token?: string;

  response?: any;

  error?: any;

  status?: number = 200;

 

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
    let url = this.URL + "account/createAccount";
    return this.http.post(url, registerRequest, { headers: this.getHttpHeaders() }).toPromise();
       
   }

 
   public login(loginForm : any) {

    const promise = this.restService.post("account/login", loginForm.value,  { headers: this.getHttpHeaderAuth() }).toPromise();

    let self = this;
    promise.then((data:any)=> {
          this.token = data,
          this.cookieService.put("JWT", this.token);
          this.status = this.restService.status;
          //hide the navbar
          //get the listedAccount and make a redirect
          self.getListedAccount(self);
      }//doesn't work 
      /*
        (error: any) => {
        this.response = error.error,
        console.table(this.error)
        this.status = error.status
      }
      */
    )
  }

  

   getListedAccount(self : AuthService = this) {
    let url = this.URL + "auth";
     self.http.get(url, { headers: self.getHttpHeaderAuth() }).subscribe(
      (data:any)=> {
        self.listedAccount = data,
        self.router.navigate(['loggedIn'], { queryParams: { uuid: self.listedAccount?.listedAccount_uuid} })
        self.hide();
      }
    ) 
  }
   

   public saveListedAccount(form : any) {
         let url = this.URL + "auth/save/listedAccount";
         this.http.post(url, form,  { headers: this.getHttpHeaderAuth() }).subscribe(
          (data:any)=> {
            this.listedAccount = data;
        }
      )
   }

   public sendComment(commentOnClassificationDto : any) {
     let url = this.URL + "auth/save/commentOnClassification";
      this.http.post(url, commentOnClassificationDto,  { headers: this.getHttpHeaderAuth() }).subscribe(
        (data:any)=> {
          this.response = data;
        }
      )
   }


   uploadImage(uuid : string | null, formData: any) {
    let url = this.URL + "auth/uploadImage/" + uuid;
    return this.http.post(url, formData,  { headers: this.getReqHeadersImage() }).toPromise();
    }

    delete(uuid: string | null) {
      let url = this.URL + "auth/delete/" + uuid;
      this.http.get(url,  { headers: this.getHttpHeaderAuth() }).subscribe(
        (data:any)=> {
          this.response = data;
        }
      )
    }

    postProfession(uuid : string | null, selectedItems : any) {
      let url = this.URL + "auth/save/professions/" + uuid;

      return this.http.post(url, selectedItems,  { headers: this.getHttpHeaderAuth() }).toPromise();
    }

  
  getToken(): string {
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
      "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    });

    return reqHeaderAuth;
  }


  getHttpHeaders(): HttpHeaders {
    const reqHeaders = new HttpHeaders({ 
      'Content-Type': 'application/JSON',
      'Access-Control-Allow-Credentials': 'true',
      "Access-Control-Allow-Origin": "*",
       "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
   });
   return reqHeaders;
  }

  getReqHeadersImage(): HttpHeaders {
    const reqHeaderImage =   new HttpHeaders({ 
      'Authorization': 'Bearer ' + this.cookieService.get("JWT"),
      'Access-Control-Allow-Credentials': 'true',
      "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    });
    return reqHeaderImage;
  }






}
