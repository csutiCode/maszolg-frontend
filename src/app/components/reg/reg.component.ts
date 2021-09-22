import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit,  } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RestService } from 'src/app/services/rest.service';

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


  constructor(private restService: RestService,
     private fb: FormBuilder, 
     private modalService: NgbModal,
     private http: HttpClient) { }

  ngOnInit(): void {
    this.createForm() 
  }


  createForm() {
    this.registrationForm = this.fb.group({
      email: new FormControl ('', [Validators.required, Validators.email]),
      password: new FormControl ('', Validators.required),
      confirmedPassword: new FormControl ('', Validators.required),
    }); 
  }


  onSubmit() {
     
    var reqHeaders = new HttpHeaders({ 
            'Content-Type': 'application/JSON',
          'Access-Control-Allow-Credentials': 'true',
          "Access-Control-Allow-Origin": "*",
             "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
         });

      
    this.http.post("http://localhost:8080/account/createAccount", this.registrationForm.value, { headers: reqHeaders })
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
    


}
