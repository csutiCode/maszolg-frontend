import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Messages } from '../utils/messages';

@Component({
  selector: 'app-data-protection',
  templateUrl: './data-protection.component.html',
  styleUrls: ['./data-protection.component.css']
})
export class DataProtectionComponent implements OnInit {

  text:any;

  adminMail: string = Messages.adminMail;


  constructor(private restService: RestService) { }

  ngOnInit(): void {
    this.getText();
  }

  
  getText() {
    return this.restService.get("public/" + "data-protection").subscribe(
      (data:any)=> {
        this.text = data,
        console.log(this.text)
      }
    )
  }


}
