import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Dcnericssonalarm } from '../dto/dcnericssonalarm';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/dcnericssonalarm/post';
const uriDateSearch = Constants.apiUrl + '/dcnericssonalarm/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/dcnericssonalarm/downloadCSV";

@Injectable({
  providedIn: 'root'
})

export class DcnericssonalarmService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getDcnericssonalarmList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getDcnericssonalarmById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getDcnericssonalarmsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getDcnericssonalarmsByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveDcnericssonalarm(dcnericssonalarm: Dcnericssonalarm): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, dcnericssonalarm);
	}

	deleteDcnericssonalarm(dcnericssonalarm: Dcnericssonalarm): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, dcnericssonalarm);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
