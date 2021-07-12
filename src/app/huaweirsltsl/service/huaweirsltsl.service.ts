import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Huaweirsltsl } from '../dto/huaweirsltsl';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/huaweirsltsl/post';
const uriDateSearch = Constants.apiUrl + '/huaweirsltsl/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/huaweirsltsl/downloadCSV";

@Injectable({
  providedIn: 'root'
})

export class HuaweirsltslService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getHuaweirsltslList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getHuaweirsltslById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getHuaweirsltslsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getHuaweirsltslsByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveHuaweirsltsl(huaweirsltsl: Huaweirsltsl): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, huaweirsltsl);
	}

	deleteHuaweirsltsl(huaweirsltsl: Huaweirsltsl): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, huaweirsltsl);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
