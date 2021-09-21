import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-my-classifications',
  templateUrl: './my-classifications.component.html',
  styleUrls: ['./my-classifications.component.css']
})
export class MyClassificationsComponent implements OnInit {


  
  closeModal?: string;
  listedAccount: any;

  uuid: string | null = this.route.snapshot.queryParamMap.get('uuid')


  constructor( private restService: RestService,
    private route: ActivatedRoute,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getListedAccount(this.uuid);

  }


  getListedAccount(uuid: string | null) {
    return this.restService.get("search/account/" + uuid).subscribe(
      (data:any)=> {
        this.listedAccount = data,
        console.log("Listed Account objekt from the method in MyClassifications Component: ");
        console.log(this.listedAccount)
        //I have to call this method here, because all other initialization is too early -> they don't create listedaccount object
      }
    )
  }


  reactOnComment() {
    console.log("React on comment")
    //open a modal to handle this 
  }

  triggerModal(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


  



}
