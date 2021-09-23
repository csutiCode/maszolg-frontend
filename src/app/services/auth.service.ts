import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  visible: boolean;


  constructor(private cookieService: CookieService,
        private router: Router) {
    //this hides the navbar if somebody logged in
    this.visible = true; 
    if (this.getToken()!=null)
      this.visible = false; 
   }



  getToken(): string {
    console.log("Token from getToken: " + this.cookieService.get("JWT"));
    return this.cookieService.get("JWT");
  }

  hide() { this.visible = false; }

  show() { this.visible = true; }

  toggle() { this.visible = !this.visible; }






}
