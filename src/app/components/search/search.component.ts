import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private dataService: DataService) { }

  countries: any;
  cities: any;
  selectedCountry: any = {
    id: 0, name: ''
  };
  selectedCity: string = '';
 


  ngOnInit(): void {
    this.showAll();
    this.onSelect(this.selectedCountry.id);
  }

  showAll() {
    return this.dataService.getAll().subscribe(
      (data:any)=> {
        this.countries = data,
        console.log(this.countries);
      }
    );
  }

  //TODO: get data from backend
  onSelect(country_id: any){
    this.dataService.getAll().subscribe((res:any)=>{
      this.cities = res['cities'].filter(
        (res:any)=>res.country_id == country_id!.value
      ),
        console.log(this.cities);
    })
  }

  //TODO: build the backend URL
  onSubmit(event: any) {
    this.selectedCity = event.target.value;
    console.log("Hello world" + this.selectedCity);
    this.dataService.getAccountsForCity(this.selectedCity).subscribe(
      (response: any) => console.log(response),
      (error: any) => console.log(error)
    )
  }

}


