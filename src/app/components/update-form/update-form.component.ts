import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component,  OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import {  ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { RestService } from 'src/app/services/rest.service';
import { Messages } from '../utils/messages';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css']
})
export class UpdateFormComponent implements OnInit {

  firstName: string = Messages.firstName;
  lastName: string = Messages.lastName;
  email: string = Messages.email;
  phone: string = Messages.phone;
  country: string = Messages.country;
  city: string = Messages.city;
  postalCode: string = Messages.postalCode;
  street: string = Messages.street;
  number: string = Messages.number;
  about: string = Messages.about;
  webPage: string = Messages.web;

  
  //TODO: get the listedAccount Object
  uuid: string | null = this.route.snapshot.queryParamMap.get('uuid')

  regForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl(''),
    comment: new FormControl(''),
    phoneNumber: new FormControl('', Validators.required),
    webPage: new FormControl(''),
    country: new FormControl('', Validators.required),
    city:  new FormControl('', Validators.required),
    postalCode:  new FormControl('', Validators.required),
    street:  new FormControl('', Validators.required),
    number:  new FormControl('', Validators.required),
    workAddress: new FormControl(''),

    cityFromBackend: new FormControl(''),
    postalCodeFromBackend: new FormControl(''),
    streetFromBackend: new FormControl(''),
    numberFromBackend: new FormControl('')


});

  secondPage:boolean = false;
  
  listedAccount: any;

  countries: Array<any> | undefined;

  cities: any;


  selectedCountry: any = {
    uuid: 0, name: ''};

  selectedCity: any = {
    uuid: 0, name: ''};

  backendMessage: any;

  token?: string;

  elseCity?: string;

  firstLogin: boolean = false;

  enabled: boolean = true;


  constructor( 
                private restService: RestService, 
                private route: ActivatedRoute,
                private cookieService: CookieService,
                private http: HttpClient) {
                  
    this.getListedAccount(this.uuid);
    this.token= cookieService.get("JWT");
    
   }

    ngOnInit(): void {

      this.getAllCountries();
      this.onSelectCountry(this.selectedCountry.uuid);

    }

    createForm() {
      
      //set the values from the listedAccount
      this.regForm.get("email")?.setValue(this.listedAccount?.email);      
      this.regForm.get("firstName")?.setValue(this.listedAccount.firstName);
      this.regForm.get("lastName")?.setValue(this.listedAccount.lastName);
      this.regForm.get("comment")?.setValue(this.listedAccount?.comment);
      this.regForm.get("webPage")?.setValue(this.listedAccount?.webPage);
      this.regForm.get("phoneNumber")?.setValue(this.listedAccount?.phoneNumber);
      this.regForm.get("city")?.setValue(this.listedAccount?.address?.city.city_uuid);
      this.regForm.get("postalCode")?.setValue(this.listedAccount?.address?.postalCode);
      this.regForm.get("street")?.setValue(this.listedAccount?.address?.street);
      this.regForm.get("number")?.setValue(this.listedAccount?.address?.number);

      this.regForm.get("cityFromBackend")?.setValue(this.listedAccount?.address?.city.name);
      this.regForm.get("postalCodeFromBackend")?.setValue(this.listedAccount?.address?.postalCode);
      this.regForm.get("streetFromBackend")?.setValue(this.listedAccount?.address?.street);
      this.regForm.get("numberFromBackend")?.setValue(this.listedAccount?.address?.number);


      //disable the edit of the fields, if they are already set
      if  (!this.enabled) {
       this.regForm.get("firstName")?.disable();
       this.regForm.get("lastName")?.disable();
       this.regForm.get("comment")?.disable();
       //this.regForm.get("webPage")?.disable();
       this.regForm.get("phoneNumber")?.disable();
       this.regForm.get("postalCode")?.disable();
       this.regForm.get("street")?.disable();
       this.regForm.get("number")?.disable();
      }
    
     
      
    }


    getListedAccount(uuid: string | null) {
      return this.restService.get("search/account/" + uuid).subscribe(
        (data:any)=> {
          this.listedAccount = data,
          console.log("Listed Account object from the method in UpdateForm Component: ");
          console.table(this.listedAccount)
          //I have to call this method here, because all other initialization is too early -> they don't create listedaccount object
          //if the most important property is not set, then first login
          if (this.listedAccount.firstName==null) {
            this.firstLogin = true;
            this.enabled = true;
          } else {
            this.firstLogin = false;
            this.enabled = false;
          }
          console.log("firstname");
          console.log(this.listedAccount.firstName);

          this.createForm();
        }
      )
    }

     
    getAllCountries() {
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


    onSubmit() {
        
        console.table(this.regForm.value);

        console.log("Listed Account Object before sending it: ")
        console.table(this.listedAccount);

        
        var reqHeader = new HttpHeaders({ 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.token,
          'Access-Control-Allow-Credentials': 'true',
          "Access-Control-Allow-Origin": "http://localhost:8080/*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        });


          this.http.post("http://localhost:8080/auth/save/listedAccount", this.regForm.value,  { headers: reqHeader }).subscribe(
          (data:any)=> {
            this.listedAccount = data,
            console.log(this.listedAccount)
            //simple reload
            //reload the page
            //window.location.reload();
          }
        )
  }


  enableEdit() {
    this.enabled = true;
    this.regForm.get("firstName")?.enable();  
    this.regForm.get("lastName")?.enable();
    this.regForm.get("comment")?.enable();
    this.regForm.get("phoneNumber")?.enable();
    this.regForm.get("postalCode")?.enable();
    this.regForm.get("street")?.enable();
    this.regForm.get("number")?.enable();
  }




}
