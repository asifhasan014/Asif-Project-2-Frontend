import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Uniquelinktableforutilization } from '../dto/uniquelinktableforutilization';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/uniquelinktableforutilization/post';
const uriDateSearch = Constants.apiUrl + '/uniquelinktableforutilization/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/uniquelinktableforutilization/downloadCSV";

@Injectable({
  providedIn: 'root'
})

export class UniquelinktableforutilizationService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getUniquelinktableforutilizationList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getUniquelinktableforutilizationById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getUniquelinktableforutilizationsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getUniquelinktableforutilizationsByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveUniquelinktableforutilization(uniquelinktableforutilization: Uniquelinktableforutilization): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, uniquelinktableforutilization);
	}

	deleteUniquelinktableforutilization(uniquelinktableforutilization: Uniquelinktableforutilization): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, uniquelinktableforutilization);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
