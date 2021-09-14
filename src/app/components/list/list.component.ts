import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private restService: RestService, private route: ActivatedRoute,private router: Router) { }

  accounts: any;
  cityName: string | null = this.route.snapshot.queryParamMap.get('city')

  ngOnInit(): void {
    //get the city parameter from the URL
    this.route.queryParams
      .subscribe(params => {
        console.log(params); 
      }
    );
    this.getAllAccountsForCity(this.route.snapshot.queryParamMap.get('city'));
  }

  getAllAccountsForCity(cityName: string | null) {
    return this.restService.get("/city/" + cityName).subscribe(
      (data:any)=> {
        this.accounts = data,
        console.log(this.accounts)
      }
    )
  }

  onMore(accountUuid: string) {
    console.log(accountUuid);
    this.router.navigate(['account'], { queryParams: { uuid: accountUuid }});
  }

  


}
