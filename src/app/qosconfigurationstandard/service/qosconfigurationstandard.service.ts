import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Qosconfigurationstandard } from '../dto/qosconfigurationstandard';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/qosconfigurationstandard/post';
const uriDateSearch = Constants.apiUrl + '/qosconfigurationstandard/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/qosconfigurationstandard/downloadCSV";

@Injectable({
  providedIn: 'root'
})

export class QosconfigurationstandardService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getQosconfigurationstandardList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getQosconfigurationstandardById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getQosconfigurationstandardsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getQosconfigurationstandardsByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveQosconfigurationstandard(qosconfigurationstandard: Qosconfigurationstandard): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, qosconfigurationstandard);
	}

	deleteQosconfigurationstandard(qosconfigurationstandard: Qosconfigurationstandard): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, qosconfigurationstandard);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
