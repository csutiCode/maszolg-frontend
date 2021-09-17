import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListService } from 'src/app/services/list.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private restService: RestService, private route: ActivatedRoute,private router: Router,
    private listService: ListService) { }

  accounts: any;

  cityName: string | null = this.route.snapshot.queryParamMap.get('city')

  categories: any;

  selectedCategory: any =  {id: 0, name: ''};

  ngOnInit(): void {
    //get the city parameter from the URL
    this.route.queryParams
      .subscribe(params => {
        console.log(params); 
      }
    );
    this.getAllAccountsForCity(this.route.snapshot.queryParamMap.get('city'));
    this.getAllCategories();
  }

  getAllAccountsForCity(cityName: string | null) {
    return this.restService.get("search/city/" + cityName).subscribe(
      (data:any)=> {
        this.accounts = data
        console.log(this.accounts)
      }
    )
  }

  getAllCategories() {
    return this.restService.get("search/categories").subscribe(
      (data:any)=> {
        this.categories = data,
        console.log(this.categories)
      }
    )
  }

  onSelect(categoryName: string) {
    console.log(categoryName);
    this.restService.get("search/" + this.cityName + "/" + categoryName).subscribe(
      (data:any)=> {
        this.accounts = data,
        console.log(this.categories)
      }
    )
  }

  onMore(accountUuid: string) {
    console.log(accountUuid);
    this.router.navigate(['account'], { queryParams: { uuid: accountUuid }});
  }
}
