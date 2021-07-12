import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Ldsettlementsiteprioritykpi } from '../dto/ldsettlementsiteprioritykpi';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/ldsettlementsiteprioritykpi/post';
const uriDateSearch = Constants.apiUrl + '/ldsettlementsiteprioritykpi/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/ldsettlementsiteprioritykpi/downloadCSV";

@Injectable({
  providedIn: 'root'
})

export class LdsettlementsiteprioritykpiService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getLdsettlementsiteprioritykpiList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getLdsettlementsiteprioritykpiById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getLdsettlementsiteprioritykpisByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getLdsettlementsiteprioritykpisByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveLdsettlementsiteprioritykpi(ldsettlementsiteprioritykpi: Ldsettlementsiteprioritykpi): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, ldsettlementsiteprioritykpi);
	}

	deleteLdsettlementsiteprioritykpi(ldsettlementsiteprioritykpi: Ldsettlementsiteprioritykpi): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, ldsettlementsiteprioritykpi);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
