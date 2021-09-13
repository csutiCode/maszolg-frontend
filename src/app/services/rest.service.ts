import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, SchedulerLike, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class RestService {

  //TODO: correct path
  readonly REST_URL: string = "localhost:8080";

  readonly HTTP_PARAMS: Object = {
      headers: new HttpHeaders(
          {
              'Content-Type': 'application/JSON'
          }
      )
  };
  

  constructor(private http: HttpClient) {
   }

get<T>(path: string, data?: any): Observable<T> {
    const params = data ? Object.assign({params: new HttpParams({fromObject: data})}, this.HTTP_PARAMS) : this.HTTP_PARAMS;
    return this.http.get<T>(this.REST_URL + path, params).pipe(
      catchError(error => {
                  let errorMsg: string;
                  if (error.error instanceof ErrorEvent) {
                      errorMsg = `Error: ${error.error.message}`;
                      } else {
                      errorMsg = this.getServerErrorMessage(error);
                      }
                      return throwError(errorMsg);
                  })
                );
}
/*
post<T>(path: string, data: any, getParams?: any): Observable<T> {
    const params = data ? Object.assign({params: new HttpParams({fromObject: getParams})}, this.HTTP_PARAMS) : this.HTTP_PARAMS;
    return this.http.post<T>(this.REST_URL + path, data, params).pipe(first(), catchError(this.handleError<T>('post: ' + path + (data))));
}

put<T>(path: string, data: any): Observable<T> {
    return this.http.put<T>(this.REST_URL + path, data, this.HTTP_PARAMS).pipe(first(), catchError(this.handleError<T>('put: ' + path + (data))));
}

delete<T>(path: string, data?: any): Observable<T> {
    path = data === undefined ? path : path + data;
    return this.http.delete<T>(this.REST_URL + path, this.HTTP_PARAMS).pipe(first(), catchError(this.handleError<T>('delete: ' + path + (data || ''))));
}
*/


private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
        case 404: {
            return `Not Found: ${error.message}`;
        }
        case 403: {
            return `Access Denied: ${error.message}`;
        }
        case 500: {
            return `Internal Server Error: ${error.message}`;
        }
        default: {
            return `Unknown Server Error: ${error.message}`;
        }

    }
}


}
