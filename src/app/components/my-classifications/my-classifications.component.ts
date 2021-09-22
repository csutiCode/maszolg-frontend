import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-my-classifications',
  templateUrl: './my-classifications.component.html',
  styleUrls: ['./my-classifications.component.css']
})
export class MyClassificationsComponent implements OnInit {
  
  closeModal?: string;
  listedAccount: any;
  comment:string ='';
  backendUrl: string =""
  response: any;
  token?: string;
  classificationUuid: string = '';

  commentOnClassificationDto: any ={
    classificationUuid: '',
    comment: ''
}

  uuid: string | null = this.route.snapshot.queryParamMap.get('uuid')


  constructor( private restService: RestService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private cookieService: CookieService,
    private http: HttpClient) {
      this.token= cookieService.get("JWT")
     }

  ngOnInit(): void {
    this.getListedAccount(this.uuid);

  }


  getListedAccount(uuid: string | null) {
    return this.restService.get("search/account/" + uuid).subscribe(
      (data:any)=> {
        this.listedAccount = data
      }
      
    )
  }


  openVerticallyCentered(content: any, uuid: string) {
    console.log("UUID:")
    this.classificationUuid = uuid;
    console.log(uuid)
    this.modalService.open(content, { centered: true });
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
        //: redirect to the profession page

      }
     )
  }
    

  


  



}
