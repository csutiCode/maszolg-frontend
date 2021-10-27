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

  response?: any;

  error?: any;

  status?: number = 200;

  reqHeaders = new HttpHeaders({ 
    'Content-Type': 'application/JSON',
    'Access-Control-Allow-Credentials': 'true',
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
  });


  constructor(private http: HttpClient) {
  }

  getImageWithId(id : number | null) {
    return this.http.get("http://localhost:8080/search/public/getImage/" + id, 
          {observe: 'body', headers: this.reqHeaders, responseType: 'blob'}).toPromise();
  }
  
  getImage(uuid : string | null) {
    return this.http.get("http://localhost:8080/search/getImage/" + uuid, 
          {observe: 'body', headers: this.reqHeaders, responseType: 'blob'}).toPromise();
  }

  getListedAccount(uuid: string | null) {
    return this.http.get("http://localhost:8080/search/account/" + uuid).toPromise();
  }

  saveClassification(uuid: string | null, classification: any) {    
    return this.http.post("http://localhost:8080/save/classification/" + uuid, classification, { headers: this.getHttpHeaders()}).toPromise(); 
  }

  passwordReset(email : any) {
    return this.http.post("http://localhost:8080/password/reset", email, { headers: this.getHttpHeaders()}).toPromise();
  }

  passwordUpdate(form : any) {
    return this.http.post("http://localhost:8080/password/update", form, { headers: this.getHttpHeaders()}).toPromise();
  }

  getTexts(uuid: string | null) {
    return this.http.get("http://localhost:8080/news/" + uuid, { headers: this.getHttpHeaders()}).toPromise();

  }

  getHttpHeaders(): HttpHeaders {
    const reqHeaders = new HttpHeaders({ 
      'Content-Type': 'application/JSON',
      'Access-Control-Allow-Credentials': 'true',
      "Access-Control-Allow-Origin": "*",
       "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
   });
   return reqHeaders;
  }

  getIdFromParam(param: string | null): string  {
    var array: string[] | undefined = new Array();
    array = param?.split("-");
    let id = "0";
    if (typeof array != "undefined"){
      id = array[1];
    }
    return id;
  }

  //+++++++++++++++++++++++++++++++++++++++FOR CAPTCHA ********************************************************

  firstNumber?: string;

  secondNumber?: string;


  //everytime generate 
  captchaList:  any[] = [
    {key:"egy", value: 1},
    {key:"kettő", value: 2},
    {key:"három", value: 3},
    {key:"négy", value: 4},
    {key:"öt", value: 5},
    {key:"hat", value: 6},
    {key:"hét", value: 7},
    {key:"nyolc", value: 8},
    {key:"kilenc", value: 9},
    {key:"tíz", value: 10},
   
  ]

  resultList:  any[] = [
    {key:"egy", value: 1},
    {key:"kettő", value: 2},
    {key:"három", value: 3},
    {key:"négy", value: 4},
    {key:"öt", value: 5},
    {key:"hat", value: 6},
    {key:"hét", value: 7},
    {key:"nyolc", value: 8},
    {key:"kilenc", value: 9},
    {key:"tíz", value: 10},
    {key:"tizenegy", value: 11},
    {key:"tizenkettő", value: 12},
    {key:"tizenhárom", value: 13},
    {key:"tizennégy", value: 14},
    {key:"tizenöt", value: 15},
    {key:"tizenhat", value: 16},
    {key:"tizenhét", value: 17},
    {key:"tizennyolc", value: 18},
    {key:"tizenkilenc", value: 19},
  ]

  captchaMap = new Map<string, number>();

  result : number = 0;

  textResult?: string;

  createCaptcha(): number {

    const firstRandom = this.captchaList[Math.floor(Math.random() * this.captchaList.length)];
    const secondRandom = this.captchaList[Math.floor(Math.random() * this.captchaList.length)];

    this.firstNumber = firstRandom.key;
    this.secondNumber = secondRandom.key;

    this.result = firstRandom.value + secondRandom.value;
    
    for (var num of this.resultList) {
      if (num.value == this.result) {
        this.textResult = num.key;
        break;
      }
    }

    return this.result;
  }

}




