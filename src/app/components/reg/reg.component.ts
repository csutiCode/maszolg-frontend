import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, Inject, OnInit,  } from '@angular/core';
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
              private http: HttpClient,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.createForm() 
  }


  createForm() {
    this.registrationForm = this.fb.group({
      email: new FormControl ('', [Validators.required, Validators.email]),
      //, createPasswordStrengthValidator()
      password: new FormControl ('', [Validators.required, Validators.minLength(8)]),
      confirmedPassword: new FormControl ('', Validators.required),
      //   [Validators.required, createDateOfBirthValidator()]
      dateOfBirth: new FormControl('', [Validators.required])
    }); 
  }


  onSubmit() {

    this.authService.register(this.mapFormToRegisterRequest());
      //TODO: same await problem
      console.log("RESPONSE FROM ONSUBMIT:")
      console.log(this.authService.response);
      this.error = this.authService.error;
      this.status = this.authService.status;

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
