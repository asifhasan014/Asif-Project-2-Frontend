import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Alarmoduslotmapping } from '../dto/alarmoduslotmapping';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/alarmoduslotmapping/post';
const uriDateSearch = Constants.apiUrl + '/alarmoduslotmapping/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/alarmoduslotmapping/downloadCSV";

@Injectable({
  providedIn: 'root'
})

export class AlarmoduslotmappingService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getAlarmoduslotmappingList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getAlarmoduslotmappingById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getAlarmoduslotmappingsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getAlarmoduslotmappingsByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveAlarmoduslotmapping(alarmoduslotmapping: Alarmoduslotmapping): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, alarmoduslotmapping);
	}

	deleteAlarmoduslotmapping(alarmoduslotmapping: Alarmoduslotmapping): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, alarmoduslotmapping);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
