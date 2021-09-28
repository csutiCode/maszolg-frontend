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


  siteName: any = '';
  update: boolean = false;
  classifications: boolean = false;
  status: number = 200;

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

  switchToClassifications() {
    console.log("Mi a fasz van???")
    this.classifications=true;
    this.update=false;
  }
  switchToUpdateForm() {
    this.classifications=false;
    this.update=true;
  }
 
  logout() {
    console.log("Logged out.")
    //delete the cookie from the storage
    this.cookieService.remove("JWT");
    //make the nav header visible
    this.authService.show();
    //redirect to home
    this.router.navigate(['/home']);
  }


  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }


    //staff to file upload
    shortLink: string = "";
    loading: boolean = false; // Flag variable
    file?: any; // Variable to store file
    formData = new FormData();
  

  
    // On file Select
    onChange(event: any) {
        this.file = event.target.files[0];
    }
  
    // OnClick of button Upload
    onUpload() {


        //this.loading = !this.loading;
        console.log(this.file);

        this.upload();

        //reload the page!
        window.location.reload();

    }

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


  







  
}
