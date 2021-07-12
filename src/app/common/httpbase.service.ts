import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { BaseEntity } from './baseentity';
import { ApiResponse } from './apiresponse';
import { Constants } from './constants';

const CSRF_Nonce_URL = Constants.apiUrl + '/token/nonce/random';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

const uploadHttpOptions = {
  headers: new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class HttpbaseService {
	
	constructor(protected http:  HttpClient) { 
	}

	getEntityList(uri: string): Observable<ApiResponse> {
		const postObj = {
			operation: Constants.GetAll
		};
		
		return this.http.post<ApiResponse>(uri, postObj, httpOptions)
			.pipe(
				tap((res) => {
					this.log('getEntityList - response is received.', res);
				}),
				catchError(this.handleError<ApiResponse>('getEntityListResponse'))
			);			
	}

	getEntityById(uri, id): Observable<ApiResponse> {
		const postObj = {
		 	componentId: id,
			operation: Constants.GetById
		};
		
		return this.http.post<ApiResponse>(uri, postObj, httpOptions)
			.pipe(
				tap((res) => {
					this.log('getEntityById - response is received.', res);
				}),
				catchError(this.handleError<ApiResponse>('getUserResponseById'))
			);			
	}

	getEntityByUniqueCode(uri, code): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			operation: Constants.GetByUniqueCode
		};
		
		return this.http.post<ApiResponse>(uri, postObj, httpOptions)
			.pipe(
				tap((res) => {
					this.log('getEntityByUniqueCode - response is received.', res);
				}),
				catchError(this.handleError<ApiResponse>('getUserResponseByUniqueCode'))
			);			
	}

	getEntityListByUniqueCodeAndDate(uri, code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.http.post<ApiResponse>(uri, postObj, httpOptions)
			.pipe(
				tap((res) => {
					this.log('getEntityListByUniqueCodeAndDate - response is received.', res);
				}),
				catchError(this.handleError<ApiResponse>('getEntityListByUniqueCodeAndDate'))
			);			
	}

	getEntityListBySearchPeram(uri, inputPerams): Observable<ApiResponse> {
		
		return this.http.post<ApiResponse>(uri, inputPerams, httpOptions)
			.pipe(
				tap((res) => {
					this.log('getEntityListByInputPeram - response is received.', res);
				}),
				catchError(this.handleError<ApiResponse>('getEntityListByInputPeram'))
			);			
	}

	getEntityListForVendor(uri, inputPerams): Observable<ApiResponse> {
		
		return this.http.post<ApiResponse>(uri, inputPerams, httpOptions)
			.pipe(
				tap((res) => {
					this.log('getEntityListForVendor - response is received.', res);
				}),
				catchError(this.handleError<ApiResponse>('getEntityListForVendor'))
			);			
	}

	getEntityListByWFS(uri, inputPerams): Observable<ApiResponse> {
		// const postObj = {
		// 	operation: Constants.GetAll
		// };
		
		return this.http.post<ApiResponse>(uri, inputPerams, httpOptions)
			.pipe(
				tap((res) => {
					this.log('getEntityListByInputPeram - response is received.', res);
				}),
				catchError(this.handleError<ApiResponse>('getEntityListByInputPeram'))
			);			
	}
	
	saveEntity(uri, entity: BaseEntity): Observable<ApiResponse>{
		var postObj = Object.assign({}, entity);
		if(entity.componentId == undefined || entity.componentId <= 0){
			delete postObj['componentId'];
			postObj.operation = Constants.Save;
		} else {
			postObj.operation = Constants.Update;	
		}
		
		//console.log(postObj);
		return this.http.post<ApiResponse>(uri, postObj, httpOptions)
			.pipe(
				tap((res) => {
					this.log('saveEntity - response is received.', res);
				}),
				catchError(this.handleError<ApiResponse>('saveEntity'))
			);			
	}

	updateEntityList(uri, entityList): Observable<ApiResponse>{
		
		// entityList.operation = Constants.Update;
		return this.http.post<ApiResponse>(uri, entityList, httpOptions)
			.pipe(
				tap((res) => {
					this.log('updateEntityList - response is received.', res);
				}),
				catchError(this.handleError<ApiResponse>('updateEntityList'))
			);			
	}
	

	deleteEntity(uri, entity: BaseEntity): Observable<ApiResponse>{
		const postObj = {
			componentId: entity.componentId,
			operation: 'Delete',
			csrfNonce: entity.csrfNonce	
		};
		
		//console.log(postObj);
		return this.http.post<ApiResponse>(uri, postObj, httpOptions)
			.pipe(
				tap((res) => {
					this.log('deleteEntity - response is received.', res);
				}),
				catchError(this.handleError<ApiResponse>('deleteEntity'))
			);			
	}
	
	getEntityListByOperation(uri: string, postObj: any): Observable<ApiResponse> {		
		return this.http.post<ApiResponse>(uri, postObj, httpOptions)
			.pipe(
				tap((res) => {
					this.log('getEntityListByOperation - response is received.', res);
				}),
				catchError(this.handleError<ApiResponse>('getEntityListByOperation'))
			);			
	}
	
	postData(uri, postObj: any): Observable<ApiResponse>{		
		//console.log(postObj);
		return this.http.post<ApiResponse>(uri, postObj, httpOptions)
			.pipe(
				tap((res) => {
					this.log('postData - response is received.', res);
				}),
				catchError(this.handleError<ApiResponse>('postData'))
			);			
	}

// post data with operation type
	postExecuteOnDemandData(uri, postObj: any): Observable<ApiResponse>{		
		//console.log(postObj);
		postObj.operation = Constants.onDemandExecution;
		return this.http.post<ApiResponse>(uri, postObj, httpOptions)
			.pipe(
				tap((res) => {
					this.log('postData - response is received.', res);
				}),
				catchError(this.handleError<ApiResponse>('postData'))
			);			
	}

	uploadFile(uri, file: any): Observable<ApiResponse>{		
		//console.log(postObj);
		var fd = new FormData();
        fd.append('file', file, file.name);
		return this.http.post<ApiResponse>(uri, fd, uploadHttpOptions)
			.pipe(
				tap((res) => {
					this.log('uploadFile - response is received.', res);
				}),
				catchError(this.handleError<ApiResponse>('uploadFile'))
			);			
	}
	
	downloadFile(uri): Observable<Blob> {   
		//const options = { responseType: 'blob' }; there is no use of this
		//let uri = '/my/uri';
		// this.http refers to HttpClient. Note here that you cannot use the generic get<Blob> as it does not compile: instead you "choose" the appropriate API in this way.
		return this.http.get(uri, { responseType: 'blob' });
	}
	
	getData(uri): Observable<ApiResponse>{		
		//console.log(postObj);
		return this.http.get<ApiResponse>(uri)
			.pipe(
				tap((res) => {
					this.log('get - response is received.', res);
				}),
				catchError(this.handleError<ApiResponse>('get'))
			);			
	}
	
	getCSRFNonce(): Observable<ApiResponse>{
		return this.getData(CSRF_Nonce_URL);
	}
	
    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
	protected handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
     
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
     
        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);
     
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }	
	
	/** Log a HttpbaseService message with the MessageService */
	protected log(message: string, data: any = null) {
		//only enable it for debugging purpose.
		//console.log(`HttpbaseService: ${message}`, data);
	}		
	
}
