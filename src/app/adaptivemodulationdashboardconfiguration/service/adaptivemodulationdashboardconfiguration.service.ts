import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Adaptivemodulationdashboardconfiguration } from '../dto/adaptivemodulationdashboardconfiguration';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/adaptivemodulationdashboardconfiguration/post';
const uriDateSearch = Constants.apiUrl + '/adaptivemodulationdashboardconfiguration/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/adaptivemodulationdashboardconfiguration/downloadCSV";

@Injectable({
  providedIn: 'root'
})

export class AdaptivemodulationdashboardconfigurationService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getAdaptivemodulationdashboardconfigurationList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getAdaptivemodulationdashboardconfigurationById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getAdaptivemodulationdashboardconfigurationsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getAdaptivemodulationdashboardconfigurationsByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveAdaptivemodulationdashboardconfiguration(adaptivemodulationdashboardconfiguration: Adaptivemodulationdashboardconfiguration): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, adaptivemodulationdashboardconfiguration);
	}

	deleteAdaptivemodulationdashboardconfiguration(adaptivemodulationdashboardconfiguration: Adaptivemodulationdashboardconfiguration): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, adaptivemodulationdashboardconfiguration);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
