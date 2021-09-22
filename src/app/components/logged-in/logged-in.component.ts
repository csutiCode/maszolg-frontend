import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieModule, CookieService } from 'ngx-cookie';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.css']
})
export class LoggedInComponent implements OnInit {


  siteName: any = '';
  update: boolean = false;
  classifications: boolean = false;

  listedAccount:  any;

  //if it's the first login, we have to set the data
  firstLoginParam: string | null = this.route.snapshot.queryParamMap.get('firstLogin')

  firstLogin: boolean = true;

  uuid: string | null = this.route.snapshot.queryParamMap.get('uuid')

  constructor(private router: Router, 
              private restService: RestService, 
              private route: ActivatedRoute,
              private cookieService: CookieService) {
                
  this.firstLoginParam = this.route.snapshot.queryParamMap.get('firstLogin')

  if (this.firstLoginParam=="false") {
    this.firstLogin = false;
    } 
  }

  ngOnInit(): void {
  this.restService.getListedAccount("search/accounts/" + this.uuid);
  }

  getListedAccount(uuid: string | null) {
    return this.restService.get("search/accounts/" + uuid).subscribe(
      (data:any)=> {
        this.listedAccount = data
        console.table(this.listedAccount)
         //redirect to the first login page or to the normal login page, set the first login as query param
        if (this.listedAccount?.lastName!="" && this.listedAccount!=null){
          this.router.navigate(['loggedIn'], { queryParams: { uuid: this.listedAccount.listedAccount_uuid, firstLogin: false }, })
        } else {
          this.router.navigate(['loggedIn'], { queryParams: { uuid: this.listedAccount?.listedAccount_uuid, firstLogin: true }, })

      }
      }
    )
  }
 
  logout() {
    console.log("Logged out.")
    //delete the cookie from the storage
    this.cookieService.remove("JWT");
    //redirect to home
    this.router.navigate(['/home']);
  }

  switchToUpdate(event:any) {
    this.update = true;
    this.classifications=false;
  }

  switchToClassifications(event: any) {
    this.classifications= true;
    this.update=false;
  }
}
