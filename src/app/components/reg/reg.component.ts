import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent implements OnInit {

  registrationForm: any;

  response?: any;

  constructor(private restService: RestService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) { }

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


    this.restService.post("account/createAccount", this.registrationForm.value).subscribe(
      (data: any)=> {
        this.response = data,
        console.log("message from backend: ")
        console.log(data)


        this.router.navigate(['/login']);
      }, (error: HttpErrorResponse) => {
        console.log('123 ' + error.status + " - " + error.statusText);
      }
    )
    //ha sikeres a regisztráció: modal -> kerlek, jelentkezz be
    
  }
}
