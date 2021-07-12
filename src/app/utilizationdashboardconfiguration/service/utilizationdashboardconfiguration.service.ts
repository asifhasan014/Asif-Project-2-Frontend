import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Utilizationdashboardconfiguration } from '../dto/utilizationdashboardconfiguration';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/utilizationdashboardconfiguration/post';
const uriDateSearch = Constants.apiUrl + '/utilizationdashboardconfiguration/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/utilizationdashboardconfiguration/downloadCSV";

@Injectable({
  providedIn: 'root'
})

export class UtilizationdashboardconfigurationService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getUtilizationdashboardconfigurationList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getUtilizationdashboardconfigurationById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getUtilizationdashboardconfigurationsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getUtilizationdashboardconfigurationsByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveUtilizationdashboardconfiguration(utilizationdashboardconfiguration: Utilizationdashboardconfiguration): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, utilizationdashboardconfiguration);
	}

	deleteUtilizationdashboardconfiguration(utilizationdashboardconfiguration: Utilizationdashboardconfiguration): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, utilizationdashboardconfiguration);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
