import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-classification',
  templateUrl: './classification.component.html',
  styleUrls: ['./classification.component.css']
})
export class ClassificationComponent implements OnInit {

  classificationForm = new FormGroup({
    
    email: new FormControl(''),
    createdBy: new FormControl(''),
    comment: new FormControl(''),
    rating: new FormControl(''),
  });

  uuid: string | null = this.route.snapshot.queryParamMap.get('uuid')

  backendMessage?: string;
  
  constructor(private restService: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
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
