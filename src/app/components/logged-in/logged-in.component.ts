import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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


  constructor(private router: Router, private restService: RestService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.listedAccount = this.restService.getListedAccount("search/accounts/" + this.uuid);

  }

  getListedAccount(uuid: string | null) {
    return this.restService.get("search/accounts/" + uuid).subscribe(
      (data:any)=> {
        this.listedAccount = data,
        console.log(this.listedAccount)
      }
    )
  }
 

  logout() {
    console.log("Logged out.")
    //delete the cookie from the storage

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
