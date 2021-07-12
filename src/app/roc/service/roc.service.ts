import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Roc } from '../dto/roc';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/roc/post';
const uriDateSearch = Constants.apiUrl + '/roc/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/roc/downloadCSV";

@Injectable({
  providedIn: 'root'
})

export class RocService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getRocList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getRocById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getRocsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getRocsByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveRoc(roc: Roc): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, roc);
	}

	deleteRoc(roc: Roc): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, roc);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
