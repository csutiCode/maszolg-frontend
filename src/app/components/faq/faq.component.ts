import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { PublicService } from 'src/app/services/public.service';
import { Messages } from '../utils/messages';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  required:string = Messages.required;
  wrongEmail: string = Messages.wrongEmail


  passwordForgotten: boolean = false;
  email?: string;
  response: any;
  status: any;

  passwordResetSent: boolean = false;

  passwordResetForm: any;

  constructor(private publicService: PublicService,
        private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {  
    this.passwordResetForm = this.fb.group({
      email: new FormControl('', [Validators.email, Validators.required])
    })
  }


  onResetPassword() {
    
    console.table(this.passwordResetForm.value)
    let email = this.passwordResetForm.get("email").value;
    const promise = this.publicService.passwordReset(email);

    promise.then( (data:any)=> {
      this.response = data;
      this.passwordResetSent = true;
      
      }, (error: any) => {
       
        this.response = error.error,
        this.status = error.status
      }
    )
  }

}
