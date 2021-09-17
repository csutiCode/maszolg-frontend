import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css']
})
export class UpdateFormComponent implements OnInit {

 
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
    category: new FormControl(''),
    profession: new FormControl('')

  });

  countries: Array<any> | undefined;
  cities: any;
  categories: Array<any> | undefined;
  professions: Array<any> | undefined;
  


  selectedCountry: any = {
    uuid: 0, name: ''};
  selectedCity: any = {
    uuid: 0, name: ''};

  selectedCategory: any = {
      uuid: 0, name: ''
    };

    selectedProfession: any = {
      uuid: 0, name: ''
    };

  constructor(private restService: RestService) { }

  
    //TODO: send a get request to get all of the countries and cities 


    ngOnInit(): void {
      this.showAll();
      this.onSelectCountry(this.selectedCountry.uuid);
      this.onSelectCategory(this.selectedCategory.uuid);
      this.getAllCategories();
    }

    getAllCategories() {
      return this.restService.get("search/categories").subscribe(
        (data:any)=> {
          this.categories = data,
          console.log(this.categories)
        }
      )
    }
  
    showAll() {
      return this.restService.get("search").subscribe(
        (data:any)=> {
          this.countries = data,
          console.log(this.countries)
        }
      )
    }


    onSelectCountry(uuid: string){
      this.cities = this.countries?.find((country) => country.country_uuid == uuid ).cities;
    }

    onSelectCategory(uuid: string){
      this.professions = this.categories?.find((category) => category.category_uuid == uuid ).professions;
    }

  onSubmit() {

  }

}
