import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Dashboardconfigurationforrsltsl } from '../dto/dashboardconfigurationforrsltsl';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/dashboardconfigurationforrsltsl/post';
const uriDateSearch = Constants.apiUrl + '/dashboardconfigurationforrsltsl/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/dashboardconfigurationforrsltsl/downloadCSV";

@Injectable({
  providedIn: 'root'
})

export class DashboardconfigurationforrsltslService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}

	saveChartconfiguration(dashboardconfigurationforrsltsl: Dashboardconfigurationforrsltsl): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, dashboardconfigurationforrsltsl);
	}
  
	/* this is the get api for all information */
	getDashboardconfigurationforrsltslList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getDashboardconfigurationforrsltslById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getDashboardconfigurationforrsltslsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getDashboardconfigurationforrsltslsByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveDashboardconfigurationforrsltsl(dashboardconfigurationforrsltsl: Dashboardconfigurationforrsltsl): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, dashboardconfigurationforrsltsl);
	}

	deleteDashboardconfigurationforrsltsl(dashboardconfigurationforrsltsl: Dashboardconfigurationforrsltsl): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, dashboardconfigurationforrsltsl);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
