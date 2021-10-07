import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { CookieService } from 'ngx-cookie';
import { ListedAccount } from '../listedAccount';
import { AuthService } from 'src/app/services/auth.service';
import { Messages } from '../utils/messages';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  required : string = Messages.required
  login : string = Messages.login;


  loginForm: any;
  token: any;
  listedAccount?: ListedAccount;
  firstLogin: boolean = false;

  constructor(private fb: FormBuilder,
              private authService: AuthService) {
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
    this.authService.login(this.loginForm);
    }

}
