import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-classification',
  templateUrl: './classification.component.html',
  styleUrls: ['./classification.component.css']
})
export class ClassificationComponent implements OnInit {

  classificationForm: any;

  uuid: string | null = this.route.snapshot.queryParamMap.get('uuid')

  backendMessage?: string;

  response?: any;

  error?: any;

  status?: number = 200;

  
  constructor(private restService: RestService, private route: ActivatedRoute, private router: Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private http: HttpClient){
    this.createForm() }

  ngOnInit(): void {
     
  }

  createForm() {
    this.classificationForm = this.fb.group({
    
      email: new FormControl('', Validators.required),
      createdBy: ['', Validators.required ],
      comment: new FormControl('', Validators.required),
      rating: new FormControl('', Validators.required),
    }); 
  }

  onSubmit() {
    console.warn(this.classificationForm.value);

    
    var reqHeaders = new HttpHeaders({ 
      'Content-Type': 'application/JSON',
    'Access-Control-Allow-Credentials': 'true',
    "Access-Control-Allow-Origin": "*",
       "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
   });


        this.http.post("http://localhost:8080/save/classification/" + this.uuid, this.classificationForm.value, { headers: reqHeaders })
        .subscribe(
        (data:any)=> {
          this.response = data,
          //this.status = this.response.status,
          console.log("message from backend: ")
          console.log(this.status)
          }, (error: any) => {
            console.log('HTTP Error status code: ', error.error),
            console.table(error),
          this.response = error.error,
          this.status = error.status
        }
  
    )
    //TODO: if succesfull, send a dialog with thank you, classification saved, then reload
  }
    
  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }
    


}
