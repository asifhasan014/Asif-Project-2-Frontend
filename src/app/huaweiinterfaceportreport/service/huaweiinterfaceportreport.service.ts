import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Huaweiinterfaceportreport } from '../dto/huaweiinterfaceportreport';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/huaweiinterfaceportreport/post';
const uriDateSearch = Constants.apiUrl + '/huaweiinterfaceportreport/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/huaweiinterfaceportreport/downloadCSV";

@Injectable({
  providedIn: 'root'
})

export class HuaweiinterfaceportreportService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getHuaweiinterfaceportreportList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getHuaweiinterfaceportreportById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getHuaweiinterfaceportreportsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getHuaweiinterfaceportreportsByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveHuaweiinterfaceportreport(huaweiinterfaceportreport: Huaweiinterfaceportreport): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, huaweiinterfaceportreport);
	}

	deleteHuaweiinterfaceportreport(huaweiinterfaceportreport: Huaweiinterfaceportreport): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, huaweiinterfaceportreport);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
