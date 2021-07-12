import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Mwserviceqosdashboardconfiguration } from '../dto/mwserviceqosdashboardconfiguration';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/mwserviceqosdashboardconfiguration/post';
const uriDateSearch = Constants.apiUrl + '/mwserviceqosdashboardconfiguration/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/mwserviceqosdashboardconfiguration/downloadCSV";

@Injectable({
  providedIn: 'root'
})

export class MwserviceqosdashboardconfigurationService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getMwserviceqosdashboardconfigurationList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getMwserviceqosdashboardconfigurationById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getMwserviceqosdashboardconfigurationsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getMwserviceqosdashboardconfigurationsByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveMwserviceqosdashboardconfiguration(mwserviceqosdashboardconfiguration: Mwserviceqosdashboardconfiguration): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, mwserviceqosdashboardconfiguration);
	}

	deleteMwserviceqosdashboardconfiguration(mwserviceqosdashboardconfiguration: Mwserviceqosdashboardconfiguration): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, mwserviceqosdashboardconfiguration);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
