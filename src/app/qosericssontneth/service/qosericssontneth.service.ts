import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Qosericssontneth } from '../dto/qosericssontneth';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/qosericssontneth/post';
const uriDateSearch = Constants.apiUrl + '/qosericssontneth/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/qosericssontneth/downloadCSV";

@Injectable({
  providedIn: 'root'
})

export class QosericssontnethService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getQosericssontnethList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getQosericssontnethById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getQosericssontnethsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getQosericssontnethsByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveQosericssontneth(qosericssontneth: Qosericssontneth): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, qosericssontneth);
	}

	deleteQosericssontneth(qosericssontneth: Qosericssontneth): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, qosericssontneth);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
