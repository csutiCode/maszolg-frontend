import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { Messages } from '../components/utils/messages';



@Injectable({
  providedIn: 'root'
})
export class RestService {

   URL: string = Messages.baseLocalUrl

  

  readonly HTTP_PARAMS: Object = {
      headers: new HttpHeaders(
          {
            'Content-Type': 'application/JSON',
            'Access-Control-Allow-Credentials': 'true',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
                
              
          }
      )
  };

  constructor(private http: HttpClient) {
}

getListedAccount<ListedAccount> (path: string, data?: any): Observable<ListedAccount>  {
const params = data ? Object.assign({params: new HttpParams({fromObject: data})}, this.HTTP_PARAMS) : this.HTTP_PARAMS;

return this.http.get<ListedAccount>(this.URL + path, params).pipe(
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

get<T>(path: string, data?: any): Observable<T> {
    const params = data ? Object.assign({params: new HttpParams({fromObject: data})}, this.HTTP_PARAMS) : this.HTTP_PARAMS;
    return this.http.get<T>(this.URL + path, params).pipe(
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




post<T>(path: string, data: any, getParams?: any): Observable<T> {
    const params = data ? Object.assign({params: new HttpParams({fromObject: getParams})}, this.HTTP_PARAMS) : this.HTTP_PARAMS;
    return this.http.post<T>(this.URL + path, data, params).pipe(
        catchError(error => {
            let errorMsg: string;
            if (error.error instanceof ErrorEvent) {
                console.log("Error message from the service:")
                errorMsg = `Error: ${error.error.message}`;
                } else {
                console.log("Error message from the service:")
                errorMsg = this.getServerErrorMessage(error);
                }
                return throwError(errorMsg);
            })
          );
}

/*
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
