import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  text: any;

  constructor(private restService: RestService) { }

  ngOnInit(): void {
    this.getAboutText();
  }


  
  getAboutText() {
    return this.restService.get("public/" + "contact").subscribe(
      (data:any)=> {
        this.text = data;
      }
    )
  }

}
