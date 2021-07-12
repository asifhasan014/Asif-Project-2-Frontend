import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Schedulestatus } from '../dto/schedulestatus';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uriDateSearch = Constants.apiUrl + '/schedulestatus/searchByUniqueCodeAndDate';
const uri = Constants.apiUrl + '/schedulestatus/post';
const uriReportDownload = Constants.apiUrl+ "/schedulestatus/downloadCSVfile";

@Injectable({
  providedIn: 'root'
})

export class SchedulestatusService {
	constructor(
		private httpbase: HttpbaseService,private http : Http
	) {}
  
	getSchedulestatusList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getSchedulestatusById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getSchedulestatussByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	saveSchedulestatus(schedulestatus: Schedulestatus): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, schedulestatus);
	}

	deleteSchedulestatus(schedulestatus: Schedulestatus): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, schedulestatus);	
	}
	
	getSchedulestatusssByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}

	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
