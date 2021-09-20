import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    urlsToIntercept: Array<string>;
    baseUrl: string = "http://localhost:8080/";


  constructor(public auth: AuthService) {

    this.urlsToIntercept= [
        "auth/*"
      ];

      
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //I only intercept the request if it goes to the specific backend URL, where authorization is required 
    if (request.url == this.baseUrl + this.urlsToIntercept[0]){
    let modifiedRequest = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.auth.getToken()}`
            }
        });
            return next.handle(modifiedRequest);
    }
    return next.handle(request);
   

  }

 
}