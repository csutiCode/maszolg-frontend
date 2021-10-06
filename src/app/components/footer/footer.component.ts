import { Component, OnInit } from '@angular/core';
import { Messages } from '../utils/messages';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  data_protection: string = Messages.data_protection;

  contact: string = Messages.contact;

  constructor() { }

  ngOnInit(): void {
  }

}
