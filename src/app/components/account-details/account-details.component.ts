import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { PublicService } from 'src/app/services/public.service';
import { RestService } from 'src/app/services/rest.service';
import { ListedAccount } from '../utils/interfaces';
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
  residence: string = Messages.residence;

  account?: any;

  

  classification: boolean = false;

  image?: any = {};

  data?: any;

  response: any;

  isDefault: boolean = true;

  //if a cookie is present, the user is logged in 
  isCookieSet: boolean = this.authService.getToken() ? true : false;

  commentOnClassificationDto: any ={
    classificationUuid: '',
    comment: ''
  }

  classificationUuid: string = '';

  commentOnClassification:string ='';

  constructor(private restService: RestService, 
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private publicService: PublicService) { }


  ngOnInit(): void {

    let param = this.route.snapshot.queryParamMap.get('path');

    let id = this.publicService.getIdFromParam(param);

    this.getListedAccount(id);

    this.fetchImage(id);
  }

  

  getListedAccount(id: any | null) {
    return this.restService.get("search/public/account/" + id).subscribe(
      (data:any)=> {
        this.account = data;
    
      }
    )
  }
  
  fetchImage(id: any | null) {
    //http request from the publicservice
    const promise = this.publicService.getImageWithId(id);

    promise.then(data => {
  
    let objectURL =URL.createObjectURL(data);
    this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      if (data.size!=0) {
        this.isDefault=false;
      }
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
    this.classificationUuid = uuid;
    this.modalService.open(content, { centered: true });
  }

  
  onSendComment(comment:string) {    
    this.commentOnClassificationDto.classificationUuid = this.classificationUuid;
    this.commentOnClassificationDto.comment = comment;
    this.authService.sendComment(this.commentOnClassificationDto)
    window.location.reload();
  }

  
}
