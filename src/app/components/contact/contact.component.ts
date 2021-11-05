import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PublicService } from 'src/app/services/public.service';
import { Messages } from '../utils/messages';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  text: any;

  constructor(private publicService : PublicService) { }

  ngOnInit(): void {
    this.getAboutText();
  }
  
  getAboutText() {
    return this.publicService.genericGet("public/contact").subscribe(
      (data:any)=> {
        this.text = data;
      }
    )
  }

}
