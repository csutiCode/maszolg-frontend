import { Component, OnInit } from '@angular/core';
import { PublicService } from 'src/app/services/public.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  passwordForgotten: boolean = false;
  email?: string;
  response: any;
  status: any;

  passwordResetSent: boolean = false;

  constructor(private publicService: PublicService) { }

  ngOnInit(): void {
  }

  onResetPassword() {
    
    console.log(this.email)

    const promise = this.publicService.passwordReset(this.email);

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
