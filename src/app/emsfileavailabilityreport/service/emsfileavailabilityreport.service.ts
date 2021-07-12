import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Emsfileavailabilityreport } from '../dto/emsfileavailabilityreport';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/emsfileavailabilityreport/post';
const uriDateSearch = Constants.apiUrl + '/emsfileavailabilityreport/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/emsfileavailabilityreport/downloadCSV";

@Injectable({
  providedIn: 'root'
})

export class EmsfileavailabilityreportService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getEmsfileavailabilityreportList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getEmsfileavailabilityreportById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getEmsfileavailabilityreportsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getEmsfileavailabilityreportsByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveEmsfileavailabilityreport(emsfileavailabilityreport: Emsfileavailabilityreport): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, emsfileavailabilityreport);
	}

	deleteEmsfileavailabilityreport(emsfileavailabilityreport: Emsfileavailabilityreport): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, emsfileavailabilityreport);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
