import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Comprehensivedashboardconfiguration } from '../dto/comprehensivedashboardconfiguration';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/comprehensivedashboardconfiguration/post';
const uriDateSearch = Constants.apiUrl + '/comprehensivedashboardconfiguration/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/comprehensivedashboardconfiguration/downloadCSV";

@Injectable({
  providedIn: 'root'
})

export class ComprehensivedashboardconfigurationService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getComprehensivedashboardconfigurationList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getComprehensivedashboardconfigurationById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getComprehensivedashboardconfigurationsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getComprehensivedashboardconfigurationsByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveComprehensivedashboardconfiguration(comprehensivedashboardconfiguration: Comprehensivedashboardconfiguration): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, comprehensivedashboardconfiguration);
	}

	deleteComprehensivedashboardconfiguration(comprehensivedashboardconfiguration: Comprehensivedashboardconfiguration): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, comprehensivedashboardconfiguration);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
