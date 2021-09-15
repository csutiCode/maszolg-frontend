import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  
  constructor(private restService: RestService, private route: ActivatedRoute) { }

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

  }

}
