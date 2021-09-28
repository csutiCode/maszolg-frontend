import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {

  account: any;

  uuid: string | null = this.route.snapshot.queryParamMap.get('uuid')

  classification: boolean = false;

  image?: any = {};

  data?: any;


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
        console.log(this.account)
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

}
