import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie';
import { AuthService } from 'src/app/services/auth.service';
import { RestService } from 'src/app/services/rest.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.css']
})
export class LoggedInComponent implements OnInit {

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
              private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {

  this.restService.getListedAccount("search/accounts/" + this.uuid);
  this.getImage();
  }

  getImage() {
    //TODO: refactor this shit!!!
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
        window.location.reload();
    }

    //send the post request with the image to the backend
    upload() {
    //formdata to handle the "pair"
    this.formData.append("file", this.file);

    var reqHeader = new HttpHeaders({ 
      //'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer ' + this.cookieService.get("JWT"),
      'Access-Control-Allow-Credentials': 'true',
      "Access-Control-Allow-Origin": "http://localhost:8080/*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
   });

     this.http.post("http://localhost:8080/auth/uploadImage/"+ this.uuid, this.formData,  { headers: reqHeader }).subscribe(
      (data:any)=> {
        this.message = data,
        console.log(this.message)
      }
    )
  }

   /*
    +++++++++++++++++++++++++++++++++++++++++++++++++ DELETE ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    */
  
  delete() {

    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.cookieService.get("JWT"),
      'Access-Control-Allow-Credentials': 'true',
      "Access-Control-Allow-Origin": "http://localhost:8080/*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    });


      this.http.get("http://localhost:8080/auth/delete/" + this.uuid,  { headers: reqHeader }).subscribe(
      (data:any)=> {
        this.message = data,
        console.log(this.message)
        //reload the page
        //window.location.reload();
      }
    )
  }


   /*
    +++++++++++++++++++++++++++++++++++++++++++++++++ LOGOUT ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    */

  logout() {
    console.log("Logged out.")
    //delete the cookie from the storage
    this.cookieService.remove("JWT");
    //make the nav header visible
    this.authService.show();
    //redirect to home
    this.router.navigate(['/home']);
  
  }




  







  
}
