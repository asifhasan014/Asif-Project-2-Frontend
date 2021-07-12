import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Uniquelinktableforadaptivemodulation } from '../dto/uniquelinktableforadaptivemodulation';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/uniquelinktableforadaptivemodulation/post';
const uriDateSearch = Constants.apiUrl + '/uniquelinktableforadaptivemodulation/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/uniquelinktableforadaptivemodulation/downloadCSV";

@Injectable({
  providedIn: 'root'
})

export class UniquelinktableforadaptivemodulationService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getUniquelinktableforadaptivemodulationList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getUniquelinktableforadaptivemodulationById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getUniquelinktableforadaptivemodulationsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getUniquelinktableforadaptivemodulationsByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveUniquelinktableforadaptivemodulation(uniquelinktableforadaptivemodulation: Uniquelinktableforadaptivemodulation): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, uniquelinktableforadaptivemodulation);
	}

	deleteUniquelinktableforadaptivemodulation(uniquelinktableforadaptivemodulation: Uniquelinktableforadaptivemodulation): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, uniquelinktableforadaptivemodulation);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
