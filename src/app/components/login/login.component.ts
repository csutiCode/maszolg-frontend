import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  token: any;
  listedAccount: any;

  constructor(private restService: RestService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.createForm() 
  }


  createForm() {
    this.loginForm = this.fb.group({
      email: new FormControl ('', [Validators.required, Validators.email]),
      password: new FormControl ('', Validators.required),
    }); 
  }

  onSubmit() {
    //send the credentials, get the JWT
    this.restService.post("account/login", this.loginForm.value).subscribe(
      (data:any)=> {
        this.token = data,
        console.log(this.token)
      }
    )

  

    
    //TODO: redirect to the updateForm, the param is going to be the uuid of the listed account

  }

  getListedAccount() {
    console.log("Token after login: ")
    console.log(this.token)
    /*
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })
  
    */
    //0: "Bearer undefined"!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token,
      'Access-Control-Allow-Credentials': 'true',
      "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
   });


    let myHeaders = new Headers();
                myHeaders.append('Authorization', `Bearer ${this.token}`);
                myHeaders.append('Access-Control-Allow-Origin', '*');
                myHeaders.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');


    console.table(reqHeader)

    
     //send the JWT, get the ListedAccount
     this.http.get("http://localhost:8080/auth",  { headers: reqHeader }).subscribe(
      (data:any)=> {
        this.listedAccount = data,
        console.log(this.listedAccount)
        
      }
    )
  }
}
