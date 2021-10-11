import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { Profession } from '../listedAccount';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { Messages } from '../utils/messages';


@Component({
  selector: 'app-profession',
  templateUrl: './profession.component.html',
  styleUrls: ['./profession.component.css']
})
export class ProfessionComponent implements OnInit {
  

  category:string = Messages.category;

  dropdownList : any;
  selectedItems : any;
  dropdownSettings: any;

  uuid: string | null = this.route.snapshot.queryParamMap.get('uuid')

  token?: string;

  categories: Array<any> | undefined;

  professions?: Array<Profession> | undefined;
 
  selectedProfessions?: Array<string>;

  listedAccount?: any;

  areProfessionsSet: boolean = false;

  edit?: boolean;

  selectedCategory: any = {
    uuid: 0, name: ''
  };

  selectedProfession: any = {
    uuid: 0, name: ''
  };

  backendMessage: any;

  professionArray: any;


  constructor( private restService: RestService,
    private route: ActivatedRoute,
    public authService: AuthService) {
    }

  ngOnInit(): void {
    
    this.getListedAccount(this.uuid);

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
      itemsShowLimit: 3,
    };
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
    console.table(this.dropdownList)
  }

  getListedAccount(uuid: string | null) {
    return this.restService.get("search/account/" + uuid).subscribe(
      (data:any)=> {
        this.listedAccount = data,
        
        this.areProfessionsSet = this.listedAccount.professions.length > 0 ? true : false;
        this.edit = this.listedAccount.professions.length > 0 ? false : true;

        this.professionArray = this.listedAccount.professions;
        console.log("Professions already set:");
        console.table(this.professionArray);
      }
    )
  }


  onSubmit() {

    console.log(this.professionArray)
    console.log("SELECTED ITEMS TO POST:")
    console.table(this.selectedItems)

    for (var item of this.selectedItems) {

        console.log(item.name)
        console.log(this.doesContain(item.name))

        if (this.doesContain(item.name)) {
          this.removeItem(item);
        }
    }


    console.log("SELECTED ITEMS AFTER CLEANING:")
    console.table(this.selectedItems)

    if (this.selectedItems.length==0) {
      return;
    }

    const promise = this.authService.postProfession(this.uuid, this.selectedItems);

    promise.then( (data: any) => {
      this.backendMessage = data,
      console.log(this.backendMessage)
      //window.location.reload();
    });
  }

    onItemSelect(item: any) {
      console.log(item);
    }

    enableEdit() {
      this.edit = true;
      console.log(this.edit)
    }
   
    //if it contains the selected Item, do not let it send to the backend
    doesContain(item : string): boolean {

      for (var element of this.professionArray) {
        if (element.name == item) {
          return true;
        } 
      }
      return false;
    }

    removeItem(obj : any){
      this.selectedItems = this.selectedItems.filter((item: any) => item !== obj);
 
   }

    
   
    
}
