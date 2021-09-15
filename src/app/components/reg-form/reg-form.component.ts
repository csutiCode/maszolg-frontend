import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-reg-form',
  templateUrl: './reg-form.component.html',
  styleUrls: ['./reg-form.component.css']
})
export class RegFormComponent implements OnInit {



  regForm = new FormGroup({
    
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    comment: new FormControl(''),
    phoneNumber: new FormControl(''),
    country: new FormControl(''),
    city:  new FormControl(''),
    postalCode:  new FormControl(''),
    street:  new FormControl(''),
    number:  new FormControl(''),

  });

  countries: Array<any> | undefined;
  cities: any;
  
  selectedCountry: any = {
    uuid: 0, name: ''
  };
  selectedCity: any = {
    uuid: 0, name: ''};
 


  constructor(private restService: RestService) { }

  
    //TODO: send a get request to get all of the countries and cities 


    ngOnInit(): void {
      this.showAll();
      this.onSelect(this.selectedCountry.uuid);
    }
  
    showAll() {
      return this.restService.get("/search").subscribe(
        (data:any)=> {
          this.countries = data,
          console.log(this.countries)
        }
      )
    }


    onSelect(uuid: string){
      this.cities = this.countries?.find((country) => country.country_uuid == uuid ).cities;
    }

  onSubmit() {

  }

}
