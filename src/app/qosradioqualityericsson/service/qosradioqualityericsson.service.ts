import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Qosradioqualityericsson } from '../dto/qosradioqualityericsson';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/qosradioqualityericsson/post';
const uriDateSearch = Constants.apiUrl + '/qosradioqualityericsson/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/qosradioqualityericsson/downloadCSV";

@Injectable({
  providedIn: 'root'
})

export class QosradioqualityericssonService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getQosradioqualityericssonList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getQosradioqualityericssonById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getQosradioqualityericssonsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getQosradioqualityericssonsByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveQosradioqualityericsson(qosradioqualityericsson: Qosradioqualityericsson): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, qosradioqualityericsson);
	}

	deleteQosradioqualityericsson(qosradioqualityericsson: Qosradioqualityericsson): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, qosradioqualityericsson);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
