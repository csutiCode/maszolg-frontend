import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie';
import { AuthService } from 'src/app/services/auth.service';
import { RestService } from 'src/app/services/rest.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Messages } from '../utils/messages';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { PublicService } from 'src/app/services/public.service';

@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.css']
})
export class LoggedInComponent implements OnInit {


  myData: string = Messages.myData;
  profession: string = Messages.profession;
  updateMyData :string = Messages.updateMyData;
  news : string = Messages.news;
  logout : string = Messages.logout;
  uploadTooltip:string = Messages.uploadTooltip;
  changeTooltip:string = Messages.changeTooltip;
  uploadPicture:string = Messages.uploadPicture;


  switch: string = "news";

  listedAccount:  any;
  message?: string;
  image?: any;
  data?: any;
  isDefault: boolean=true;

  uuid: string | null = this.route.snapshot.queryParamMap.get('uuid')

  constructor(private router: Router, 
              private restService: RestService, 
              private route: ActivatedRoute,
              private cookieService: CookieService,
              public authService: AuthService,
              private modalService: NgbModal,
              private http: HttpClient,
              private sanitizer: DomSanitizer,
              private publicService : PublicService) {
  }

  ngOnInit(): void {

  this.restService.getListedAccount("search/accounts/" + this.uuid);
  this.fetchImage();
  }

  fetchImage() {
    //http request from the publicservice
    const promise = this.publicService.getImage(this.uuid);

    promise.then(data => {
  
      let objectURL =URL.createObjectURL(data);
      this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);

      console.log("data")
      console.table(data)
      console.log("image")
      console.table(this.image)
      //change to the 
      if (data.size!=0) {
        this.isDefault=false;
      }
    });
  
  }
  /*
    +++++++++++++++++++++++++++++++++++++++++++++++++ SWITCH IN LOGGED IN BETWEEN THE NESTED COMPONENTS +++++++++++++++++++++++++++++++++
  */
  //get the value from the toggle
  switchTo(switchValue: string) {
    this.switch = switchValue;
    console.log(this.switch)

  }

  /*
  +++++++++++++++++++++++++++++++++++++++++++++++++ IMAGE UPLOAD ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  */
  //open the modal
  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }
 
    //staff to file upload
    file?: any; // Variable to store file
    formData = new FormData();

  
    // On file Select in the image upload modal
    onChange(event: any) {
        this.file = event.target.files[0];
    }
  
    // OnClick of button Upload
    onUpload() {
        console.log(this.file);
        this.upload();
        //window.location.reload();
    }

    //send the post request with the image to the backend
    upload() {

    //formdata to handle the "pair"
    this.formData.append("file", this.file);
    
    const promise = this.authService.uploadImage(this.uuid, this.formData);

    promise.then((data:any)=> {
      this.message = data,
      console.log("MESSAGE FROM THE SERVER AFTER IMAGE UPLOAD:")
      console.log(this.message)
      }
    )
   
  }

   /*
    +++++++++++++++++++++++++++++++++++++++++++++++++ DELETE ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    */
  
  delete() {
    this.authService.delete(this.uuid);
  }


   /*
    +++++++++++++++++++++++++++++++++++++++++++++++++ LOGOUT ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    */

  onLogout() {
    console.log("Logged out.")
    //delete the cookie from the storage
    this.cookieService.remove("JWT");
    //make the nav header visible
    this.authService.show();
    //redirect to home
    this.router.navigate(['/home']);
  
  }




  







  
}
