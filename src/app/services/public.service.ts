import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Messages } from '../components/utils/messages';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})

// PUBLIC SERVICE FOR THE NOT AUTHENTICATED METHODS

export class PublicService {

  

  URL: string = Messages.baseLocalUrl

  countries: Array<any> | undefined

  response: any;

  status: any;

  reqHeaders = new HttpHeaders({ 
    'Content-Type': 'application/JSON',
    'Access-Control-Allow-Credentials': 'true',
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
 });


  constructor(private http: HttpClient,
            private restService: RestService) {
  }

  saveClassification(uuid: string | null, classification: any) {    
    this.restService.post("save/classification/" + uuid, classification)
    .subscribe(
    (data:any)=> {
      this.response = data,
      console.log("message from backend PUBLICSERVICE: ")
      console.log(this.status)
      }, (error: any) => {
        console.log('HTTP Error status code PUBLICSERVICE: ', error.error),
        console.table(error),
      this.response = error.error,
      this.status = error.status
      }
    )
  }


  saveClassificationPromise(uuid: string | null, classification: any) {    
    
    return this.restService.post("save/classification/" + uuid, classification).toPromise();
    
    
  }

 



}




