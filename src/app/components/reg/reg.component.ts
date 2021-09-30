import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, Inject, OnInit,  } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {  NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { createDateOfBirthValidator, createPasswordStrengthValidator } from '../utils/formValidators';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent implements OnInit {

  registrationForm: any;

  response?: any;

  error?: any;

  status?: number = 200;

  readonly URL: string = "http://localhost:8080/";

  date: any = {year: '', month: '',day:''};

  registerRequest: any = {
    email: '',
    password: '',
    confirmedPassword: '',
    dateOfBirth: ''
  };


  model?: NgbDateStruct

  constructor(private fb: FormBuilder, 
              private modalService: NgbModal,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.createForm() 
  }


  createForm() {
    this.registrationForm = this.fb.group({
      email: new FormControl ('', [Validators.required, Validators.email]),
      password: new FormControl ('', [Validators.required, Validators.minLength(8), createPasswordStrengthValidator()]),
      confirmedPassword: new FormControl ('', Validators.required),
      dateOfBirth: new FormControl('', [Validators.required, createDateOfBirthValidator()])
    }); 
  }


  onSubmit() {
    
    this.mapFormToRegisterRequest();
     
    var reqHeaders = new HttpHeaders({ 
            'Content-Type': 'application/JSON',
          'Access-Control-Allow-Credentials': 'true',
          "Access-Control-Allow-Origin": "*",
             "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
         });

      
    this.http.post("http://localhost:8080/account/createAccount", this.registerRequest, { headers: reqHeaders })
    .subscribe(
      (data:any)=> {
        this.response = data,
        //this.status = this.response.status,
        console.log("message from backend: ")
        console.log(this.response)
        }, (error: any) => {
          console.table(error),
          console.log('HTTP Error status code: ', error.error),
        this.response = error.error,
        this.status = error.status
      }
        
    )
    /*
    this.restService.post("account/createAccount", this.registrationForm.value).subscribe(
      (data: any)=> {
        this.response = data,
        console.log("message from backend: ")
        console.log(data)
      }, response => console.log('HTTP Error', response.status) 
    )
   */
  }

  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }

  mapFormToRegisterRequest() {
    this.registerRequest = this.registrationForm.value;
    this.date = this.registrationForm.get("dateOfBirth").value;
    this.date = new Date(this.date.year, this.date.month, this.date.day)
    this.registerRequest.dateOfBirth= this.date;
    console.log("RegisterRequest Object: ")
    console.table(this.registerRequest)
    return this.registerRequest;
  }
  


}
