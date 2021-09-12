import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  url = 'assets/store.json';
  backendUrl = 'localhost:8080'

  getAll(): any {
    //this will return all json data
    return this.http.get<any>(this.url);
  }

  getAccountsForCity(city: string) {
    return this.http.get<any>(this.backendUrl + '/search/' + city);
  }
 
  
}
