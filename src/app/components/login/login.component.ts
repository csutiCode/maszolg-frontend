import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { CookieService } from 'ngx-cookie';
import { ListedAccount } from '../listedAccount';
import { AuthService } from 'src/app/services/auth.service';
import { NavService } from 'src/app/services/nav.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: any;
  token: any;
  listedAccount?: ListedAccount;
  firstLogin: boolean = false;

  constructor(private restService: RestService, 
              private fb: FormBuilder, 
              private router: Router, 
              private http: HttpClient,
              private cookieService: CookieService,
              private authService: AuthService
              ) {
   }
  

  ngOnInit(): void {
    this.createForm() 
  }


  createForm() {
    this.loginForm = this.fb.group({
      email: new FormControl ('', [Validators.required, Validators.email]),
      password: new FormControl ('', Validators.required),
    }); 
  }

  onLogin() {
    //send the credentials, get the JWT
    this.restService.post("account/login", this.loginForm.value).subscribe(
      (data:any)=> {
        this.token = data,
        console.log(this.token)
        //set the token as cookie -> works
        this.cookieService.put("JWT", this.token);
        this.getListedAccount();
        this.authService.hide();
        
      }
    )
  }

  getListedAccount() {

    //TODO: refactor this shit
    console.log("Token after login: ")
    console.log(this.token)

    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token,
      'Access-Control-Allow-Credentials': 'true',
      "Access-Control-Allow-Origin": "http://localhost:8080/*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
   });
   /* temporarely doesn't work, don't know why
   this.restService.get("http://localhost:8080/auth",  { headers: reqHeader }).subscribe(
    (data:any)=> {
      this.listedAccount = data,
      console.log(this.listedAccount)
      if (this.listedAccount!=null)
      this.router.navigate(['loggedIn'], { queryParams: { uuid: this.listedAccount.listedAccount_uuid }})
    }
  )
    */
    
     //send the JWT, get the ListedAccount
     this.http.get("http://localhost:8080/auth",  { headers: reqHeader }).subscribe(
      (data:any)=> {
        this.listedAccount = data,
        this.router.navigate(['loggedIn'], { queryParams: { uuid: this.listedAccount?.listedAccount_uuid, firstLogin: false } })
      }
    )
  }
}
