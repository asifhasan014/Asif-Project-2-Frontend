import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Serverhealthcheckinventory } from '../dto/serverhealthcheckinventory';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/serverhealthcheckinventory/post';
const uriDateSearch = Constants.apiUrl + '/serverhealthcheckinventory/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/serverhealthcheckinventory/downloadCSV";

const uriOnDemand = Constants.apiUrl + "/serverhealthcheckinventory/postOnDemand";

@Injectable({
  providedIn: 'root'
})

export class ServerhealthcheckinventoryService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getServerhealthcheckinventoryList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getServerhealthcheckinventoryById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getServerhealthcheckinventorysByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getServerhealthcheckinventorysByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveServerhealthcheckinventory(serverhealthcheckinventory: Serverhealthcheckinventory): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, serverhealthcheckinventory);
	}

	deleteServerhealthcheckinventory(serverhealthcheckinventory: Serverhealthcheckinventory): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, serverhealthcheckinventory);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}

	postSelectedRowDataList(rowData): Observable<ApiResponse> {
		return this.httpbase.postExecuteOnDemandData(uriOnDemand, rowData);
	  }
}
