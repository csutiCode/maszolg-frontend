import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  text: any;

  constructor(private restService: RestService) { }

  ngOnInit(): void {
    this.text = this.getAboutText();
  }


  getAboutText() {
    return this.restService.get("public/" + "about").subscribe(
      (data:any)=> {
        this.text = data,
        console.log(this.text)
      }
    )
  }

}
