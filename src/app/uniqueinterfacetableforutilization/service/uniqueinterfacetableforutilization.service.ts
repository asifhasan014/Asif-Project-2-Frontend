import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Uniqueinterfacetableforutilization } from '../dto/uniqueinterfacetableforutilization';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/uniqueinterfacetableforutilization/post';
const uriDateSearch = Constants.apiUrl + '/uniqueinterfacetableforutilization/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/uniqueinterfacetableforutilization/downloadCSV";

@Injectable({
  providedIn: 'root'
})

export class UniqueinterfacetableforutilizationService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getUniqueinterfacetableforutilizationList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getUniqueinterfacetableforutilizationById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getUniqueinterfacetableforutilizationsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getUniqueinterfacetableforutilizationsByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveUniqueinterfacetableforutilization(uniqueinterfacetableforutilization: Uniqueinterfacetableforutilization): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, uniqueinterfacetableforutilization);
	}

	deleteUniqueinterfacetableforutilization(uniqueinterfacetableforutilization: Uniqueinterfacetableforutilization): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, uniqueinterfacetableforutilization);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
