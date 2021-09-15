import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {

  account: any;

  uuid: string | null = this.route.snapshot.queryParamMap.get('uuid')

  classification: boolean = false;


  constructor(private restService: RestService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      console.log(params); 
    }
    );
    this.getListedAccount(this.route.snapshot.queryParamMap.get('uuid'));
  }

  getListedAccount(uuid: string | null) {
    return this.restService.get("accounts/" + uuid).subscribe(
      (data:any)=> {
        this.account = data,
        console.log(this.account)
      }
    )
  }


  onSubmit() {
    this.classification = true;
  }

  onCancel() {
    this.classification = false;
  }

}
