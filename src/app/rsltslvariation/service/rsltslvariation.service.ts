import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Rsltslvariation } from '../dto/rsltslvariation';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/rsltslvariation/post';
const uriDateSearch = Constants.apiUrl + '/rsltslvariation/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/rsltslvariation/downloadCSV";
const uriSystemLinkCode=Constants.apiUrl+ "/rsltslvariation/getSystemLinkCodeList";

@Injectable({
  providedIn: 'root'
})

export class RsltslvariationService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getRsltslvariationList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getRsltslvariationById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getRsltslvariationsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getRsltslvariationsByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveRsltslvariation(rsltslvariation: Rsltslvariation): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, rsltslvariation);
	}

	deleteRsltslvariation(rsltslvariation: Rsltslvariation): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, rsltslvariation);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}

	getSystemLinkCode(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uriSystemLinkCode);
	}
}
