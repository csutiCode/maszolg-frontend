import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { PublicService } from 'src/app/services/public.service';
import { Messages } from '../utils/messages';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  required : string = Messages.required
  login : string = Messages.login;

  status?: number = 200;

  loginForm: any;


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
