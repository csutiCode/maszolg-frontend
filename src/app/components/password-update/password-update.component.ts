import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { AuthService } from 'src/app/services/auth.service';
import { createPasswordStrengthValidator } from '../utils/formValidators';
import { Messages } from '../utils/messages';

@Component({
  selector: 'app-password-update',
  templateUrl: './password-update.component.html',
  styleUrls: ['./password-update.component.css']
})
export class PasswordUpdateComponent implements OnInit {

  updatePasswordForm: any;

  required : string = Messages.required
  wrongPassword : string = Messages.wrongPassword
  tooShort:  string = Messages.tooShort

  status: any;

  response: any;

  @HostListener('window:popstate', ['$event'])
  onPopState(event: any) {
    //We need this to delete the cookie, if somebody accidently makes a back and show the header and footer 
    this.cookieService.remove("JWT");
    this.authService.show();
  }

  constructor(private fb: FormBuilder,
            private http: HttpClient,
            private router : Router,
            private cookieService: CookieService,
            private authService: AuthService) { }

  ngOnInit(): void {
  
 
    this.createForm() 
 
  }

  
  createForm() {
    this.updatePasswordForm = this.fb.group({
      token: new FormControl ('', [Validators.required]),
      password: new FormControl ('', [Validators.required, Validators.minLength(8), createPasswordStrengthValidator()]),
      confirmedPassword: new FormControl('', [Validators.required, createPasswordStrengthValidator()])
    }); 
  }



  onSubmit() {    
    console.table(this.updatePasswordForm.value)
    const promise = this.http.post("http://localhost:8080/password/update", this.updatePasswordForm.value).toPromise();

    promise.then( (data:any)=> {
      this.response = data;
      this.status = this.response.status
      //if successfull, redirect on login
      this.router.navigate(['/login']);
      }, (error: any) => {
       
        this.response = error.error,
        this.status = error.status
      }
    )
    
  }
}
