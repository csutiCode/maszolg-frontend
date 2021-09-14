import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private restService: RestService) { }


  getAllAccountsForCity(cityName: string | null) {
    return this.restService.get("/city/" + cityName).subscribe(
      (data:any)=> { data
        //console.log(this.accounts)
      }
    )
  }

  getAllCategories() {
    return this.restService.get("/categories/").subscribe(
      (data:any)=> {
         data
      }
    )
  }

}
