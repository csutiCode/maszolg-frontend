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
              private router: Router) {

  }

  accounts: any[] = [];

  cityName: string | null = this.route.snapshot.queryParamMap.get('city')

  categories: any;

  selectedCategory: any =  {id: 0, name: ''};

  searchText?: string;

  sortArray : string[] = ["Minősítés", "abc", "nincs"]

  sortOption: string = '';
  
 
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
        this.accounts = data;
      }
    )
    
  }
  
  getAllCategories() {
    return this.restService.get("search/categories").subscribe(
      (data:any)=> {
        this.categories = data;
      }
    )
  }

  onSelect(categoryName: string) {
    //from the default option, the value is 0
    if (categoryName=="0") {
      this.getAllAccountsForCity();
    }


    this.restService.get("search/" + this.cityName + "/" + categoryName).subscribe(
      (data:any)=> {
        this.accounts = data;
      }
    )
  }

  onMore(accountUuid: string) {
    this.router.navigate(['account'], { queryParams: { uuid: accountUuid }});
  }



  applyFilter(event: Event) {
    const filter = (<HTMLInputElement>event.target).value.toLowerCase();
    if (!filter) {
      this.getAllAccountsForCity();
    }
    //TODO: SEARCH ON THE PROFESSION AS WELL
    this.accounts = this.accounts.filter((account:any) => 
        account.firstName.toLowerCase().includes(filter)
      | account.lastName.toLowerCase().includes(filter))
  }


  onSort(sortOption : string) {
    //make a switch
    switch (sortOption) {
      case "abc":
        this.accounts = this.accounts.sort((a: any,b: any) =>  a.lastName.localeCompare(b.lastName));
        break;
      case "Minősítés":
        this.accounts = this.accounts.sort((a: any, b: any) => b.averageRating - a.averageRating);
        break;
      case "nincs":
        this.getAllAccountsForCity;
        break
      
    }

  }

  
}
