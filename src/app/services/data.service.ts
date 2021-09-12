import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  url = 'assets/store.json';

  getAll(): any {
    //this will return all json data
    return this.http.get<any>(this.url);
  }
}
