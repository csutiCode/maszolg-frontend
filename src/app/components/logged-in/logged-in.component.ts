import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { AuthService } from 'src/app/services/auth.service';
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



  uuid: string | null = this.route.snapshot.queryParamMap.get('uuid')

  constructor(private router: Router, 
              private restService: RestService, 
              private route: ActivatedRoute,
              private cookieService: CookieService,
              public authService: AuthService) {

  }

  ngOnInit(): void {
  this.restService.getListedAccount("search/accounts/" + this.uuid);
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

  
}
