import { Component, OnInit,  } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {  NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { createDateOfBirthValidator, createPasswordStrengthValidator } from '../utils/formValidators';
import { Messages } from '../utils/messages';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent implements OnInit {

  
  required : string = Messages.required
  wrongEmail: string = Messages.wrongEmail

  registrationForm: any;

  response?: any = this.authService.response;

  error?: any = this.authService.error;

  status?: number = this.authService.status;

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
              private authService: AuthService) { }

  ngOnInit(): void {
    this.createForm(); 
  }


  createForm() {
    this.registrationForm = this.fb.group({
      email: new FormControl ('', [Validators.required, Validators.email]),
      //TODO:
      // createPasswordStrengthValidator()
      password: new FormControl ('', [Validators.required, Validators.minLength(8)]),
      confirmedPassword: new FormControl ('', Validators.required),
      // [Validators.required, createDateOfBirthValidator()]
      dateOfBirth: new FormControl('', [Validators.required]),
      acceptGDPR: new FormControl(false, Validators.requiredTrue)
    }); 
  }


  onSubmit() {
   

    const promise = this.authService.register(this.mapFormToRegisterRequest());

    promise.then( (data:any)=> {
      this.response = data;

      }, (error: any) => {
       
        this.response = error.error,
        this.status = error.status
      }
    )
    

  }

  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }

  mapFormToRegisterRequest() {

    this.registerRequest = this.registrationForm.value;
    this.date = this.registrationForm.get("dateOfBirth").value;
    this.date = new Date(this.date.year, this.date.month, this.date.day)
    this.registerRequest.dateOfBirth= this.date;
   
    return this.registerRequest;

  }
  


}
