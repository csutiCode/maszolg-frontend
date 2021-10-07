import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { Messages } from '../utils/messages';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {


  category : string = Messages.category;
  fullName : string = Messages.fullName;
  rank : string = Messages.rank;
  profession : string = Messages.profession;

  constructor(private restService: RestService, 
              private route: ActivatedRoute,
              private router: Router) { }

  accounts: any[] = [];

  cityName: string | null = this.route.snapshot.queryParamMap.get('city')

  categories: any;

  selectedCategory: any =  {id: 0, name: ''};

  currentPage = 1;

  itemsPerPage = 5;

  pageSize= 1;


  ngOnInit(): void {
    //get the city parameter from the URL
    this.route.queryParams
      .subscribe(params => {
        console.log(params); 
      }
    );
      this.getAllAccountsForCity();
      this.getAllCategories();
  }

  getAllAccountsForCity() {
    return this.restService.get("search/city/" + this.cityName).subscribe(
      (data:any)=> {
        this.accounts = data
        console.table(this.accounts)
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
    //from the default option, the value is 0
    if (categoryName=="0") {
      this.getAllAccountsForCity();
    }


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

  //to pagination
  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage*(pageNum - 1);
  }
  
  public changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
  }
  
}
