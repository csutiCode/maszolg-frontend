import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  texts?: any[];

  uuid = this.route.snapshot.queryParamMap.get('uuid')

  constructor(private restService: RestService,
              private route: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.getTexts();
  }

  getTexts() {
    return this.restService.get("news/" + this.uuid).subscribe(
      (data:any)=> {
        this.texts = data,
        console.log("LISTED ACCONT: ")
        console.table(this.texts)
      }
    )
  }
}
