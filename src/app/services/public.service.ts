import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Messages } from '../components/utils/messages';

@Injectable({
  providedIn: 'root'
})

// PUBLIC SERVICE FOR THE NOT AUTHENTICATED METHODS

export class PublicService {

  baseUrl: string = Messages.baseLocalUrl;



  countries: Array<any> | undefined

  response?: any;

  error?: any;

  status?: number = 200;

  
  constructor(private http: HttpClient) {
  }
  
  //generic get method for the public requests
  genericGet(path: string, data?: any): Observable<any>{
    return this.http.get<any>(this.baseUrl + path).pipe();
  }
  

  getImageWithId(id : number | null) {
    return this.http.get(`${this.baseUrl}search/public/getImage/${id}`, {observe: 'body', headers: this.getHttpHeaders(), responseType: 'blob'}).toPromise();
  }
  
  getImage(uuid : string | null) {
    return this.http.get(`${this.baseUrl}search/public/getImage/${uuid}`, {observe: 'body', headers: this.getHttpHeaders(), responseType: 'blob'}).toPromise();
  }

  getListedAccount(uuid: string | null) {
    return this.http.get(`${this.baseUrl}search/account/${uuid}`).toPromise();
  }

  saveClassification(id: string | null, classification: any) {    
    return this.http.post(`${this.baseUrl}save/classification/${id}`, classification, { headers: this.getHttpHeaders()}).toPromise(); 
  }

  passwordReset(email : any) {
    return this.http.post(`${this.baseUrl}password/reset`, email, { headers: this.getHttpHeaders()}).toPromise();

  }

  passwordUpdate(form : any) {
    return this.http.post(`${this.baseUrl}password/update`, form, { headers: this.getHttpHeaders()}).toPromise();
  }

  getTexts(uuid: string | null) {
    return this.http.get(`${this.baseUrl}news/${uuid}`, { headers: this.getHttpHeaders()}).toPromise();

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
    var array: string[] | undefined;
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




