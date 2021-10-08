import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PublicService } from 'src/app/services/public.service';
import { Messages } from '../utils/messages';

@Component({
  selector: 'app-classification',
  templateUrl: './classification.component.html',
  styleUrls: ['./classification.component.css']
})
export class ClassificationComponent implements OnInit {


  required:string = Messages.required;

  classificationForm: any;

  uuid: string | null = this.route.snapshot.queryParamMap.get('uuid')

  backendMessage?: string;

  response?: any;

  error?: any;

  status?: number = 200;

  starRating = 0; 

  
  constructor(private route: ActivatedRoute, 
              private fb: FormBuilder,
              private modalService: NgbModal,
              private publicService: PublicService){
    this.createForm() 
  }

  ngOnInit(): void {
     
  }

  createForm() {
    this.classificationForm = this.fb.group({
      email: new FormControl('', Validators.required),
      createdBy: ['', Validators.required ],
      text: new FormControl('', Validators.required),
      rating: new FormControl('', Validators.required),
    }); 
  }

  onSubmit() {

    const promise = this.publicService.saveClassificationPromise(this.uuid, this.classificationForm.value);

    promise.then((data:any)=> {
      this.response = data,
      console.log("message from backend: ")
      console.log(this.status)
      }, (error: any) => {
        console.log('HTTP Error status code: ', error.error),
        console.table(error),
      this.response = error.error,
      this.status = error.status
        }
    )
    
  }
    
  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }

  reloadPage() {
    //reload the page with the button
    window.location.reload();
  }
  
  then() {

  }


}
