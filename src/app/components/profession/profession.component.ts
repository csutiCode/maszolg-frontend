import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Profession } from '../listedAccount';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-profession',
  templateUrl: './profession.component.html',
  styleUrls: ['./profession.component.css']
})
export class ProfessionComponent implements OnInit {

  dropdownList : any;
  selectedItems : any;
  dropdownSettings: any;

  uuid: string | null = this.route.snapshot.queryParamMap.get('uuid')

  token?: string;

  categories: Array<any> | undefined;

  professions?: Array<Profession> | undefined;
 
  selectedProfessions?: Array<string>;

  selectedCategory: any = {
    uuid: 0, name: ''
  };

  selectedProfession: any = {
    uuid: 0, name: ''
  };

  backendMessage: any;

  constructor( private restService: RestService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
    public auth: AuthService,
    private router: Router) {
    }

  ngOnInit(): void {
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
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
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


  onSubmit() {
    console.log("SELECTED ITEMS TO POST:")
    console.table(this.selectedItems)

  var reqHeader = new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.auth.getToken(),
    'Access-Control-Allow-Credentials': 'true',
    "Access-Control-Allow-Origin": "http://localhost:8080/*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    });


   this.http.post("http://localhost:8080/auth/save/professions/" + this.uuid, this.selectedItems,  { headers: reqHeader }).subscribe(
    (data:any)=> {
      this.backendMessage = data,
      console.log(this.backendMessage)
      window.location.reload();

    })
  }

    onItemSelect(item: any) {
      console.log(item);
    }
    onSelectAll(items: any) {
      console.log(items);
    }

    
}
