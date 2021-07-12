import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Ericssonmodulation } from '../dto/ericssonmodulation';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/ericssonmodulation/post';
const uriDateSearch = Constants.apiUrl + '/ericssonmodulation/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/ericssonmodulation/downloadCSV";

@Injectable({
  providedIn: 'root'
})

export class EricssonmodulationService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getEricssonmodulationList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getEricssonmodulationById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getEricssonmodulationsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getEricssonmodulationsByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveEricssonmodulation(ericssonmodulation: Ericssonmodulation): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, ericssonmodulation);
	}

	deleteEricssonmodulation(ericssonmodulation: Ericssonmodulation): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, ericssonmodulation);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
