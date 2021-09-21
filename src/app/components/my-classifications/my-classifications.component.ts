import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { RestService } from 'src/app/services/rest.service';
import { ListedAccount } from '../listedAccount';

@Component({
  selector: 'app-my-classifications',
  templateUrl: './my-classifications.component.html',
  styleUrls: ['./my-classifications.component.css']
})
export class MyClassificationsComponent implements OnInit {


  listedAccount: any;

  uuid: string | null = this.route.snapshot.queryParamMap.get('uuid')


  constructor( private restService: RestService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getListedAccount(this.uuid);

  }


  getListedAccount(uuid: string | null) {
    return this.restService.get("search/account/" + uuid).subscribe(
      (data:any)=> {
        this.listedAccount = data,
        console.log("Listed Account objekt from the method in MyClassifications Component: ");
        console.log(this.listedAccount)
        //I have to call this method here, because all other initialization is too early -> they don't create listedaccount object
      }
    )
  }


  reactOnComment() {
    console.log("React on comment")

  }



}
