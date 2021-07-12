import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Performancedatau2000ip } from '../dto/performancedatau2000ip';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/performancedatau2000ip/post';
const uriDateSearch = Constants.apiUrl + '/performancedatau2000ip/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/performancedatau2000ip/downloadCSV";

@Injectable({
  providedIn: 'root'
})

export class Performancedatau2000ipService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getPerformancedatau2000ipList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getPerformancedatau2000ipById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getPerformancedatau2000ipsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}

	getPerformancedatau2000ipsByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {

		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);
		//return this.httpbase.getEntityListByUniqueCodeAndDate(uriDateSearch,code, from, to);		
	}
	
	savePerformancedatau2000ip(performancedatau2000ip: Performancedatau2000ip): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, performancedatau2000ip);
	}

	deletePerformancedatau2000ip(performancedatau2000ip: Performancedatau2000ip): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, performancedatau2000ip);	
	}	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
