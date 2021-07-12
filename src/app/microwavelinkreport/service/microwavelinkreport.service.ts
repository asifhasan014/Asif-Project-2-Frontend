import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Microwavelinkreport } from '../dto/microwavelinkreport';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/microwavelinkreport/post';
const uriDateSearch = Constants.apiUrl + '/microwavelinkreport/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/microwavelinkreport/downloadCSV";

@Injectable({
  providedIn: 'root'
})

export class MicrowavelinkreportService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getMicrowavelinkreportList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getMicrowavelinkreportById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getMicrowavelinkreportsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getMicrowavelinkreportsByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveMicrowavelinkreport(microwavelinkreport: Microwavelinkreport): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, microwavelinkreport);
	}

	deleteMicrowavelinkreport(microwavelinkreport: Microwavelinkreport): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, microwavelinkreport);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
