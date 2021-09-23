import { Component, OnInit } from '@angular/core';

import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public nav: NavService) { }

  ngOnInit(): void {
   
  }

 
}
