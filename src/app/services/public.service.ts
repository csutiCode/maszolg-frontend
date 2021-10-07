import { HttpClient } from '@angular/common/http';
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


  constructor(private http: HttpClient,
              private restService: RestService) {
  }



}




