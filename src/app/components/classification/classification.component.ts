import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  
  constructor(private restService: RestService, private route: ActivatedRoute, private router: Router,
    private fb: FormBuilder){
      this.createForm() }

  ngOnInit(): void {
     
  }

  createForm() {
    this.classificationForm = this.fb.group({
    
      email: new FormControl('', Validators.minLength(4)),
      createdBy: ['', Validators.required ],
      comment: new FormControl('', Validators.minLength(4)),
      rating: new FormControl('', Validators.minLength(4)),
    }); 
  }

  onSubmit() {
    console.warn(this.classificationForm.value);

    this.restService.post("save/classification/" + this.uuid, this.classificationForm.value).subscribe(
      (data:any)=> {
        this.backendMessage = data,
        console.log(this.backendMessage)
      }
    )
    

    //TODO: if succesfull, send a dialog with thank you, classification saved, then reload
    this.reloadCurrentRoute();
  }
  
  reloadCurrentRoute() {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate(['home']);
    });
  }


}
