import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpbaseService } from '../common';
import { Constants } from '../common';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class LoginService { 
	
	constructor(protected http:  HttpClient) {}
	
	public loginToServer(usr, pass, csrfNonce): Observable<any> {
		const uri = Constants.apiUrl + '/security/useraccess';
		const loginObj = {
		  loginId: usr,
		  password: pass,
		  csrfNonce: csrfNonce,
		  operation: Constants.Login
		};
		
		return this.http.post<any>(uri, loginObj, httpOptions)
			.pipe(
				tap((res) => {
					this.log('response data is received.', res);
				}),
				catchError(this.handleError<any>('loginToServer'))
			);			
	}

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
	private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
     
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
     
        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);
     
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }	
	
	/** Log a LoginService message with the MessageService */
	private log(message: string, data: any = null) {
		//only enable it for debugging purpose.
		//console.log(`LoginService: ${message}`, data);
	}	
	
}
