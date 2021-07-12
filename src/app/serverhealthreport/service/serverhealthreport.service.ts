import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Serverhealthreport } from '../dto/serverhealthreport';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/serverhealthreport/post';
const uriDateSearch = Constants.apiUrl + '/serverhealthreport/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/serverhealthreport/downloadCSV";

@Injectable({
  providedIn: 'root'
})

export class ServerhealthreportService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getServerhealthreportList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getServerhealthreportById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getServerhealthreportsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getServerhealthreportsByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveServerhealthreport(serverhealthreport: Serverhealthreport): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, serverhealthreport);
	}

	deleteServerhealthreport(serverhealthreport: Serverhealthreport): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, serverhealthreport);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
