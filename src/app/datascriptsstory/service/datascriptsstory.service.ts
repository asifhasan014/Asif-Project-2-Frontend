import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Datascriptsstory } from '../dto/datascriptsstory';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/datascriptsstory/post';
const uriDateSearch = Constants.apiUrl + '/datascriptsstory/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/datascriptsstory/downloadCSV";

@Injectable({
  providedIn: 'root'
})

export class DatascriptsstoryService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getDatascriptsstoryList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getDatascriptsstoryById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getDatascriptsstorysByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getDatascriptsstorysByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveDatascriptsstory(datascriptsstory: Datascriptsstory): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, datascriptsstory);
	}

	deleteDatascriptsstory(datascriptsstory: Datascriptsstory): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, datascriptsstory);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
