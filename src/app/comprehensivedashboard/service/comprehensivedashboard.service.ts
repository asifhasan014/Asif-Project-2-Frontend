import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Comprehensivedashboard } from '../dto/comprehensivedashboard';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/comprehensivedashboard/post';
const uriDateSearch = Constants.apiUrl + '/comprehensivedashboard/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/comprehensivedashboard/downloadCSV";

@Injectable({
  providedIn: 'root'
})

export class ComprehensivedashboardService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getComprehensivedashboardList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getComprehensivedashboardById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getComprehensivedashboardsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getComprehensivedashboardsByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveComprehensivedashboard(comprehensivedashboard: Comprehensivedashboard): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, comprehensivedashboard);
	}

	deleteComprehensivedashboard(comprehensivedashboard: Comprehensivedashboard): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, comprehensivedashboard);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
