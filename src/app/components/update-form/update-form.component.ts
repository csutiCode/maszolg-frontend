import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component,  OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import {  ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css']
})
export class UpdateFormComponent implements OnInit {

  
  //TODO: get the listedAccount Object
  uuid: string | null = this.route.snapshot.queryParamMap.get('uuid')

  regForm: any;

  secondPage:boolean = false;
  
  listedAccount?: any;

  countries: Array<any> | undefined;

  cities: any;


  selectedCountry: any = {
    uuid: 0, name: ''};

  selectedCity: any = {
    uuid: 0, name: ''};

  backendMessage: any;

  token?: string;

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
      this.regForm = new FormGroup({
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        email: new FormControl(''),
        comment: new FormControl(''),
        phoneNumber: new FormControl(''),
        country: new FormControl(''),
        city:  new FormControl(''),
        postalCode:  new FormControl(''),
        street:  new FormControl(''),
        number:  new FormControl('')

    });


      //set the values from the listedAccount and set them read only if they are already set
      //
      this.regForm.get("email").setValue(this.listedAccount?.email);      
      this.regForm.get("firstName").setValue(this.listedAccount?.firstName);
      this.regForm.get("lastName").setValue(this.listedAccount?.lastName);
      this.regForm.get("comment").setValue(this.listedAccount?.comment);
      this.regForm.get("phoneNumber").setValue(this.listedAccount?.phoneNumber);
      this.regForm.get("city").setValue(this.listedAccount?.address?.city.name);
      this.regForm.get("postalCode").setValue(this.listedAccount?.address?.postalCode);
      this.regForm.get("street").setValue(this.listedAccount?.address?.street);
      this.regForm.get("number").setValue(this.listedAccount?.address?.number);
      
     
    
      //disable the edit of the fields, if they are already set
     
      if (this.regForm.get("firstName")!='') {
        this.regForm.get("firstName").disable();
      }
      if (this.regForm.get("lastName")!='') {
        this.regForm.get("lastName").disable();
      }
      if (this.regForm.get("comment")!='') {
        this.regForm.get("comment").disable();
      }
      if (this.regForm.get("phoneNumber")!='') {
        this.regForm.get("phoneNumber").disable();
      }
      if (this.regForm.get("postalCode")!='') {
        this.regForm.get("postalCode").disable();
      }
      if (this.regForm.get("street")!='') {
        this.regForm.get("street").disable();
      }
      if (this.regForm.get("number")!='') {
        this.regForm.get("number").disable();
      }
      
      if (this.regForm.get("city")!='') {
        this.enabled = false;
      }
        
      

      
    }


    getListedAccount(uuid: string | null) {
      return this.restService.get("search/account/" + uuid).subscribe(
        (data:any)=> {
          this.listedAccount = data,
          console.log("Listed Account objekt from the method in UpdateForm Component: ");
          console.log(this.listedAccount)
          //I have to call this method here, because all other initialization is too early -> they don't create listedaccount object
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
      console.log("RegForm value before sending it: ")

      console.table(this.regForm.value);

      //not the best solution
      this.listedAccount = this.regForm.value;


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
        //: redirect to the profession page
        this.secondPage = true;

      }
     )
  }


  enableEdit() {

    this.enabled = true;
    this.regForm.get("firstName").enable();  
    this.regForm.get("lastName").enable();
    this.regForm.get("comment").enable();
    this.regForm.get("phoneNumber").enable();
    this.regForm.get("postalCode").enable();
    this.regForm.get("street").enable();
    this.regForm.get("number").enable();

  }




}
