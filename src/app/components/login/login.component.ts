import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
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
