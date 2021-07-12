import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {ResponseContentType,Http} from '@angular/http';

import { Constants } from '../../common';
import { Ldsettlementincident } from '../dto/ldsettlementincident';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';

const uri = Constants.apiUrl + '/ldsettlementincident/post';
const uriReportDownload=Constants.apiUrl+ "ldsettlementincident/downloadIncidentData";
const uriDateSearch = Constants.apiUrl + '/ldsettlementincident/searchByUniqueCodeAndDate';


@Injectable({
  providedIn: 'root'
})

export class LdsettlementincidentService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getLdsettlementincidentList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getLdsettlementincidentById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getLdsettlementincidentsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	saveLdsettlementincident(ldsettlementincident: Ldsettlementincident): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, ldsettlementincident);
	}

	deleteLdsettlementincident(ldsettlementincident: Ldsettlementincident): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, ldsettlementincident);	
	}	

	downloadReport(code, from, to): Observable<any>{
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		return this.http.post(uriReportDownload, postObj, {responseType: ResponseContentType.Blob});
	}

	getLdsettlementPgsByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
}
