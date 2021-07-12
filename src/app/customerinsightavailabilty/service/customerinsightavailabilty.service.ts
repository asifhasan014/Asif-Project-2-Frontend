import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Customerinsightavailabilty } from '../dto/customerinsightavailabilty';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/customerinsightavailabilty/post';
const uriDateSearch = Constants.apiUrl + '/customerinsightavailabilty/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/customerinsightavailabilty/downloadCSV";

@Injectable({
  providedIn: 'root'
})

export class CustomerinsightavailabiltyService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getCustomerinsightavailabiltyList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getCustomerinsightavailabiltyById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getCustomerinsightavailabiltysByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getCustomerinsightavailabiltysByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveCustomerinsightavailabilty(customerinsightavailabilty: Customerinsightavailabilty): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, customerinsightavailabilty);
	}

	deleteCustomerinsightavailabilty(customerinsightavailabilty: Customerinsightavailabilty): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, customerinsightavailabilty);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
