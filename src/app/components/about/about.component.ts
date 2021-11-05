import { Component, OnInit } from '@angular/core';
import { PublicService } from 'src/app/services/public.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  text: any;

  constructor(private publicSerice: PublicService) { }

  ngOnInit(): void {
    this.text = this.getAboutText();
  }


  getAboutText() {
    return this.publicSerice.genericGet("public/" + "about").subscribe(
      (data:any)=> {
        this.text = data;
      }
    )
  }

}
