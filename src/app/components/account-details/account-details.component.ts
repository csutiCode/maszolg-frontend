import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie';
import { RestService } from 'src/app/services/rest.service';
import { Messages } from '../utils/messages';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {

  workAddress: string = Messages.workAddress;
  lastLogin: string = Messages.lastLogin;
  about: string = Messages.about;
  phone : string = Messages.phone;
  email: string = Messages.email;
  webPage :string = Messages.web;
  rank: string = Messages.rank;

  account: any;

  uuid: string | null = this.route.snapshot.queryParamMap.get('uuid')

  classification: boolean = false;

  image?: any = {};

  data?: any;

  response: any;

  //if a cookie is present, the user is logged in 
  isCookieSet: boolean = this.cookieService.get("JWT") ? true : false;

  commentOnClassificationDto: any ={
    classificationUuid: '',
    comment: ''
  }

  classificationUuid: string = '';

  token: string = this.cookieService.get("JWT");

  commentOnClassification:string ='';



  constructor(private restService: RestService, 
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private cookieService: CookieService,
    private http: HttpClient,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      console.log(params); 
    }
    );
    this.getListedAccount(this.route.snapshot.queryParamMap.get('uuid'));

    //temporarely doesn't work if i outsource it
    const reqHeader = new HttpHeaders({ 
      'Access-Control-Allow-Credentials': 'true',
      "Access-Control-Allow-Origin": "http://localhost:8080/*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
   });
      
    //get the image from the backend
    this.image = this.http.get("http://localhost:8080/search/getImage/" + this.uuid, 
        {observe: 'body', headers: reqHeader, responseType: 'blob'}).subscribe(data => {
  
        let objectURL =URL.createObjectURL(data);
        this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
  
        console.log("data")
        console.table(data)
        console.log("image")
        console.table(this.image)
  
      });
  }

  getListedAccount(uuid: string | null) {
    return this.restService.get("search/account/" + uuid).subscribe(
      (data:any)=> {
        this.account = data,
        console.log("LISTED ACCONT: ")
        console.table(this.account)
        console.log(this.account.lastLogin)
      }
    )
  }
  
  getImage() {
    const reqHeader = new HttpHeaders({ 
      //'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer ' + this.cookieService.get("JWT"),
      'Access-Control-Allow-Credentials': 'true',
      "Access-Control-Allow-Origin": "http://localhost:8080/*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
   });
      
    //get the image from the backend
    this.image = this.http.get("http://localhost:8080/search/getImage/" + this.uuid, 
        {observe: 'body', headers: reqHeader, responseType: 'blob'}).subscribe(data => {
  
        let objectURL =URL.createObjectURL(data);
        this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
  
        console.log("data")
        console.table(data)
        console.log("image")
        console.table(this.image)
  
      });
  }


  onSubmit() {
    this.classification = true;
  }

  onCancel() {
    this.classification = false;
  }

  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }


  openComment(content: any, uuid: string) {
    console.log("UUID:")
    this.classificationUuid = uuid;
    console.log(uuid)
    this.modalService.open(content, { centered: true });
    console.log("is commented?")
  }

  
  onComment(comment:string) {
    
    this.commentOnClassificationDto.classificationUuid = this.classificationUuid;
    this.commentOnClassificationDto.comment = comment;

    console.table(this.commentOnClassificationDto)
    console.log("TOKEN:")
    console.log(this.token)
    
    //TODO: send a post request to the URL with the comment of the classification
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token,
      'Access-Control-Allow-Credentials': 'true',
      "Access-Control-Allow-Origin": "http://localhost:8080/*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
   });
    //TODO: I need to get the commentOnClassification UUID somehow from the template
     this.http.post("http://localhost:8080/auth/save/commentOnClassification", this.commentOnClassificationDto,  { headers: reqHeader }).subscribe(
      (data:any)=> {
        this.response = data,
        console.log(this.response)
        
      }
     )
    //reload the page
    window.location.reload();

  }

}
