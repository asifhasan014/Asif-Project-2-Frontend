import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Huaweiportutilization } from '../dto/huaweiportutilization';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/huaweiportutilization/post';
const uriDateSearch = Constants.apiUrl + '/huaweiportutilization/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/huaweiportutilization/downloadCSV";

@Injectable({
  providedIn: 'root'
})

export class HuaweiportutilizationService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getHuaweiportutilizationList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getHuaweiportutilizationById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getHuaweiportutilizationsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getHuaweiportutilizationsByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveHuaweiportutilization(huaweiportutilization: Huaweiportutilization): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, huaweiportutilization);
	}

	deleteHuaweiportutilization(huaweiportutilization: Huaweiportutilization): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, huaweiportutilization);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
