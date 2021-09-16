import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  constructor(private restService: RestService, private router: Router) { }

  countries: Array<any> | undefined;
  cities: any;
  
  selectedCountry: any = {
    uuid: 0, name: ''
  };
  selectedCity: any = {
    uuid: 0, name: ''};
 

  ngOnInit(): void {
    this.showAll();
    this.onSelect(this.selectedCountry.uuid);
  }

  showAll() {
    return this.restService.get("search").subscribe(
      (data:any)=> {
        this.countries = data,
        console.log(this.countries)
      }
    )
  }

  onSelect(uuid: string){
    this.cities = this.countries?.find((country) => country.country_uuid == uuid ).cities;
  }

  onSubmit(cityName: string) {    
    this.router.navigate(['list'], { queryParams: { city: cityName }});
  }
  

}


