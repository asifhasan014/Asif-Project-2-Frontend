import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Chartconfiguration } from '../dto/chartconfiguration';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/chartconfiguration/post';
const uriDateSearch = Constants.apiUrl + '/chartconfiguration/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/chartconfiguration/downloadCSV";

@Injectable({
  providedIn: 'root'
})

export class ChartconfigurationService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getChartconfigurationList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getChartconfigurationById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getChartconfigurationsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getChartconfigurationsByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveChartconfiguration(chartconfiguration: Chartconfiguration): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, chartconfiguration);
	}

	deleteChartconfiguration(chartconfiguration: Chartconfiguration): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, chartconfiguration);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
