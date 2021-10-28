import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { PublicService } from 'src/app/services/public.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  texts: any;

  uuid = this.route.snapshot.queryParamMap.get('uuid')

  listedAccount: any;

  ready: boolean = false;

  classifications?: any[];

  constructor(private route: ActivatedRoute,
              public authService: AuthService,
              private modalService: NgbModal,
              private publicService : PublicService) {
  }


  ngOnInit(): void {
    this.getTexts();
    this.fetchListedAccount();

  }

  fetchListedAccount() {

    const promise = this.publicService.getListedAccount(this.uuid);

    promise.then((data:any)=> {
      this.listedAccount = data;    
     
       this.classifications = this.listedAccount.classifications;
        }
      ) 
  }

  getTexts() {
    const promise = this.publicService.getTexts(this.uuid);
    promise.then( (data:any)=> {
      this.texts = data;
      }
    )
  }

  
   /*
    +++++++++++++++++++++++++++++++++++++++++++++++++ CLASSIFICATIONS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    */
    account: any;

  

  classification: boolean = false;

    commentOnClassificationDto: any ={
      classificationUuid: '',
      comment: ''
    }
  
    classificationUuid: string = '';
  
    commentOnClassification:string ='';

  onCancel() {
    this.classification = false;
  }

  openVerticallyCenteredModal(content: any) {
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
