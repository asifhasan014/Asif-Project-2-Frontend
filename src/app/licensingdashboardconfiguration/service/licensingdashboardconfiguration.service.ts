import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Licensingdashboardconfiguration } from '../dto/licensingdashboardconfiguration';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/licensingdashboardconfiguration/post';
const uriDateSearch = Constants.apiUrl + '/licensingdashboardconfiguration/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/licensingdashboardconfiguration/downloadCSV";

@Injectable({
  providedIn: 'root'
})

export class LicensingdashboardconfigurationService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getLicensingdashboardconfigurationList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getLicensingdashboardconfigurationById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getLicensingdashboardconfigurationsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getLicensingdashboardconfigurationsByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveLicensingdashboardconfiguration(licensingdashboardconfiguration: Licensingdashboardconfiguration): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, licensingdashboardconfiguration);
	}

	deleteLicensingdashboardconfiguration(licensingdashboardconfiguration: Licensingdashboardconfiguration): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, licensingdashboardconfiguration);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
