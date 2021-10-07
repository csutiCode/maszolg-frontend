import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { FormBuilder} from '@angular/forms';
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

  constructor( private restService: RestService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
    public auth: AuthService) {
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
        console.log("Professions Component: ");
        console.log(this.listedAccount)

        console.log("Professions from the listed account: ");
        console.table(this.listedAccount.professions);

        //undefined
        console.log(this.listedAccount.professions.length)
        this.areProfessionsSet = this.listedAccount.professions.length > 0 ? true : false;
        this.edit = this.listedAccount.professions.length > 0 ? false : true;
      }
    )
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
      //window.location.reload();
      window.location.reload();

    })
  }

    onItemSelect(item: any) {
      console.log(item);
    }



    enableEdit() {
      this.edit = true;
      console.log(this.edit)
    }
   
    
}
