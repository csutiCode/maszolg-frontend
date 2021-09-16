import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent implements OnInit {

  registrationForm: any;

  backendMessage: any;

  constructor(private restService: RestService, private fb: FormBuilder) { }

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
      (data:any)=> {
        this.backendMessage = data,
        console.log(this.backendMessage)
      }
    )
    console.log(this.backendMessage)
  }
}
