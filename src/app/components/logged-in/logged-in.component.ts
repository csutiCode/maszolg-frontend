import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.css']
})
export class LoggedInComponent implements OnInit {

  siteName: any = '';
  update: boolean = false;
  classifications: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
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
