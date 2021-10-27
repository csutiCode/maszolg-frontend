import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  content: any;

  constructor(private modalService: NgbModal) {
     this.openVerticallyCentered(this.content);
 }

  ngOnInit(): void {
  }

  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }

}
