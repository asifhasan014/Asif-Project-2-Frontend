import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Troubleticket } from '../dto/troubleticket';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/troubleticket/post';
const uriDateSearch = Constants.apiUrl + '/troubleticket/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/troubleticket/downloadCSV";

@Injectable({
  providedIn: 'root'
})

export class TroubleticketService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getTroubleticketList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getTroubleticketById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getTroubleticketsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getTroubleticketsByUniqueCodeAndDate(code,incident, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			incidentId: incident,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveTroubleticket(troubleticket: Troubleticket): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, troubleticket);
	}

	deleteTroubleticket(troubleticket: Troubleticket): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, troubleticket);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
