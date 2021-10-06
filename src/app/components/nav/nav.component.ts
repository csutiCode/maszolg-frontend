import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Messages } from '../utils/messages';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  search: string = Messages.search;
  account: string = Messages.account;
  aboutUs: string = Messages.aboutUs;
  registration: string = Messages.registration;
  login: string = Messages.login;


  constructor(public authService: AuthService) { }

  ngOnInit(): void {
   
  }

 
}
