import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CaptchaService } from 'src/app/services/captcha.service';
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

  response:any =  this.publicService.response;

  error?: any = this.publicService.error;

  status?: number = this.publicService.status;

  

  ratingList : any[] =  [
    {key: "Nem ajánlom", value:"ONE"},
    {key: "Elégséges", value:"TWO"},
    {key: "Közepes", value:"THREE"},
    {key: "Ajánlom", value:"FOUR"},
    {key: "Kiváló", value:"FIVE"}
]

  firstNumber?: string;

  secondNumber?: string;

  textResult?: string;

  notRobot: boolean = false;
   
  constructor(private route: ActivatedRoute, 
              private fb: FormBuilder,
              private modalService: NgbModal,
              private publicService: PublicService,
              public captchaService: CaptchaService){
    this.createForm();

  }

  ngOnInit(): void {
    this.captchaService.createCaptcha();
    this.firstNumber = this.captchaService.firstNumber;
    this.secondNumber = this.captchaService.secondNumber;
    this.textResult = this.captchaService.textResult;
  }

  testIfRobot(event: Event) {

    const result = (<HTMLInputElement>event.target).value.toLowerCase();

    if (result==this.textResult) {
      this.notRobot = true;
    } else {
      this.notRobot = false;;
    }

  }


  createForm() {
    this.classificationForm = this.fb.group({
      email: new FormControl('', Validators.required),
      createdBy: ['', Validators.required ],
      text: new FormControl('', Validators.required),
      rating: new FormControl('', Validators.required),
      acceptGDPR: new FormControl(false, Validators.requiredTrue)
    }); 
  }


  onSubmit() {

    console.table(this.classificationForm.value)

    const promise = this.publicService.saveClassification(this.uuid, this.classificationForm.value);

    promise.then( (data:any)=> {

      this.response = data;
      }, (error: any) => {

        this.status = error.status
        this.response = error.error
        
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
  
  

}
