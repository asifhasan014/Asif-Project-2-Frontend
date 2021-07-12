import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Mwqosdashboardconfiguration } from '../dto/mwqosdashboardconfiguration';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/mwqosdashboardconfiguration/post';
const uriDateSearch = Constants.apiUrl + '/mwqosdashboardconfiguration/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/mwqosdashboardconfiguration/downloadCSV";

@Injectable({
  providedIn: 'root'
})

export class MwqosdashboardconfigurationService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getMwqosdashboardconfigurationList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getMwqosdashboardconfigurationById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getMwqosdashboardconfigurationsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getMwqosdashboardconfigurationsByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveMwqosdashboardconfiguration(mwqosdashboardconfiguration: Mwqosdashboardconfiguration): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, mwqosdashboardconfiguration);
	}

	deleteMwqosdashboardconfiguration(mwqosdashboardconfiguration: Mwqosdashboardconfiguration): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, mwqosdashboardconfiguration);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
