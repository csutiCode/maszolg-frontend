
import { Component,  OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {  ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PublicService } from 'src/app/services/public.service';
import { RestService } from 'src/app/services/rest.service';
import { Profession } from '../listedAccount';
import { Messages } from '../utils/messages';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css'],
  encapsulation: ViewEncapsulation.None // Add this line

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
  isWorkAddress: string = Messages.isWorkAddress;
  webPage: string = Messages.web;
  webPageToolip : string  = Messages.webPageToolip;
  isWorkAddressTooltip: string = Messages.isWorkAddressTooltip;
  required:string = Messages.required;
  disabledButton:string = Messages.disabledButton;
  enableEditButton:string = Messages.enableEdit;
  category:string = Messages.category;

  //TODO: get the listedAccount Object
  uuid: string | null = this.route.snapshot.queryParamMap.get('uuid')

  regForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl(''),
    about: new FormControl(''),
    phoneNumber: new FormControl(''),
    webPage: new FormControl(''),
    country: new FormControl('', Validators.required),
    city:  new FormControl('', Validators.required),
    postalCode:  new FormControl(''),
    street:  new FormControl(''),
    number:  new FormControl(''),
    workAddress: new FormControl(''),
    cityFromBackend: new FormControl(''),

    
    

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

  elseCity?: string;

  firstLogin: boolean = false;

  enabled: boolean = true;

  dropdownList : any;

  selectedItems : any;

  dropdownSettings: any;

  categories: Array<any> | undefined;

  professions?: Array<Profession> | undefined;
 
  selectedProfessions?: Array<string>;

  areProfessionsSet: boolean = false;

  edit?: boolean;

  selectedCategory: any = {
    uuid: 0, name: ''
  };

  selectedProfession: any = {
    uuid: 0, name: ''
  };

  professionArray: any;


  constructor( 
                private restService: RestService, 
                private route: ActivatedRoute,
                private authService: AuthService,
                private publicService: PublicService) {
  
      this.fetchListedAccount();

   }

 

    ngOnInit(): void {
        this.getAllCountries();
        this.onSelectCountry(this.selectedCountry.uuid);


        this.getAllCategories();
        this.onSelectCategory(this.selectedCategory.uuid);


        this.dropdownList = [
        
        ];
        this.selectedItems = [
        
        ];
        this.dropdownSettings = {
          singleSelection: false,
          idField: 'profession_uuid',
          textField: 'name',
          enableCheckAll: false,
          itemsShowLimit: 6,
        };
    }

    createForm() {
      //set the values from the listedAccount
      this.regForm.get("email")?.setValue(this.listedAccount?.email);      
      this.regForm.get("firstName")?.setValue(this.listedAccount.firstName);
      this.regForm.get("lastName")?.setValue(this.listedAccount.lastName);
      this.regForm.get("about")?.setValue(this.listedAccount?.about);
      this.regForm.get("webPage")?.setValue(this.listedAccount?.webPage);
      this.regForm.get("phoneNumber")?.setValue(this.listedAccount?.phoneNumber);
      //for the vienna test version
      this.regForm.get("country")?.setValue("Ausztia");
      this.regForm.get("city")?.setValue("Bécs");

      this.regForm.get("postalCode")?.setValue(this.listedAccount?.address?.postalCode);
      this.regForm.get("street")?.setValue(this.listedAccount?.address?.street);
      this.regForm.get("number")?.setValue(this.listedAccount?.address?.number);
      this.regForm.get("workAddress")?.setValue(this.listedAccount?.address?.workAddress)


      this.regForm.get("cityFromBackend")?.setValue(this.listedAccount?.address?.city.name);
      


      //disable the edit of the fields, if they are already set
      if  (!this.enabled) {
       this.regForm.get("firstName")?.disable();
       this.regForm.get("lastName")?.disable();
       this.regForm.get("about")?.disable();
       this.regForm.get("webPage")?.disable();
       this.regForm.get("phoneNumber")?.disable();
       this.regForm.get("postalCode")?.disable();
       this.regForm.get("street")?.disable();
       this.regForm.get("number")?.disable();
       this.regForm.get("workAddress")?.disable();
      }
    }


  fetchListedAccount() {
    const promise = this.publicService.getListedAccount(this.uuid);
    promise.then((data:any)=> {
      this.listedAccount = data;
      //I have to call this method here, because all other initialization is too early -> they don't create listedaccount object
      //if the most important property is not set, then first login
      if (this.listedAccount.firstName==null) {
        this.firstLogin = true;
        this.enabled = true;
      } else {
        this.firstLogin = false;
        this.enabled = false;
      }
      this.areProfessionsSet = this.listedAccount.professions.length > 0 ? true : false;
      this.professionArray = this.listedAccount.professions;
      
      this.createForm();
      
        }
      ) 
  }
     
    getAllCountries() {
      return this.restService.get("search").subscribe(
        (data:any)=> {
          this.countries = data;
        }
      )
    }

    onSelectCountry(uuid: string){
      this.cities = this.countries?.find((country) => country.country_uuid == uuid ).cities;
    }


    onSubmit() {        
        //saveListedAccount method from the authService layer
        this.authService.saveListedAccount(this.regForm.value);
        this.submitProfession();
        //reload the page
        window.location.reload();
    }


    enableEdit() {
      this.enabled = true;
      
      this.regForm.get("firstName")?.enable();  
      this.regForm.get("lastName")?.enable();
      this.regForm.get("about")?.enable();
      this.regForm.get("webPage")?.enable();
      this.regForm.get("phoneNumber")?.enable();
      this.regForm.get("postalCode")?.enable();
      this.regForm.get("street")?.enable();
      this.regForm.get("number")?.enable();
      this.regForm.get("workAddress")?.enable();
    }


    getAllCategories() {
      return this.restService.get("search/categories").subscribe(
        (data:any)=> {
          this.categories = data,
          console.log(this.categories)
        }
      )
    }

    onSelectCategory(uuid: string){ 
      this.professions = this.categories?.find((category) => category.category_uuid == uuid ).professions;
      this.dropdownList = this.professions; 
    }

    doesContain(item : string): boolean {

      for (var element of this.professionArray) {
        if (element.name == item) {
          return true;
        } 
      }
      return false;
    }

    submitProfession() {
      for (var item of this.selectedItems) {
          if (this.doesContain(item.name)) {
            this.removeItem(item);
          }
      }
  
      if (this.selectedItems.length==0) {
        return;
      }
  
      const promise = this.authService.postProfession(this.uuid, this.selectedItems);
  
      promise.then( (data: any) => {
        this.backendMessage = data,
        console.log(this.backendMessage)
        window.location.reload();
      });
    }

    removeItem(obj : any){
      this.selectedItems = this.selectedItems.filter((item: any) => item !== obj);
 
   }


}
