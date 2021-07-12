import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Userprioritymappingconfigurationvalue } from '../dto/userprioritymappingconfigurationvalue';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/userprioritymappingconfigurationvalue/post';
const uriDateSearch = Constants.apiUrl + '/userprioritymappingconfigurationvalue/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/userprioritymappingconfigurationvalue/downloadCSV";

@Injectable({
  providedIn: 'root'
})

export class UserprioritymappingconfigurationvalueService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getUserprioritymappingconfigurationvalueList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getUserprioritymappingconfigurationvalueById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getUserprioritymappingconfigurationvaluesByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getUserprioritymappingconfigurationvaluesByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveUserprioritymappingconfigurationvalue(userprioritymappingconfigurationvalue: Userprioritymappingconfigurationvalue): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, userprioritymappingconfigurationvalue);
	}

	deleteUserprioritymappingconfigurationvalue(userprioritymappingconfigurationvalue: Userprioritymappingconfigurationvalue): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, userprioritymappingconfigurationvalue);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
