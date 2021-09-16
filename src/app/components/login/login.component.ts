import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: any;

  backendMessage: any;

  constructor(private restService: RestService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.createForm() 
  }


  createForm() {
    this.loginForm = this.fb.group({
      email: new FormControl ('', [Validators.required, Validators.email]),
      password: new FormControl ('', Validators.required),
      confirmedPassword: new FormControl ('', Validators.required),
     
    }); 
  }


  onSubmit() {
    this.restService.post("account/login", this.loginForm.value).subscribe(
      (data:any)=> {
        this.backendMessage = data,
        console.log(this.backendMessage)
      }
    )
  }

}
