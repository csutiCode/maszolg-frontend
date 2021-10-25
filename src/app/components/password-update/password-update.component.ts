import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Messages } from '../utils/messages';

@Component({
  selector: 'app-password-update',
  templateUrl: './password-update.component.html',
  styleUrls: ['./password-update.component.css']
})
export class PasswordUpdateComponent implements OnInit {

  updatePasswordForm: any;

  required : string = Messages.required

  status: any;

  response: any;

  constructor(private fb: FormBuilder,
            private http: HttpClient,
            private router : Router) { }

  ngOnInit(): void {
  
 
    this.createForm() 
 
  }

  
  createForm() {
    this.updatePasswordForm = this.fb.group({
      token: new FormControl ('', [Validators.required]),
      password: new FormControl ('', Validators.required),
      confirmedPassword: new FormControl('', Validators.required)
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
