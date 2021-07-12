import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Ericssontsl } from '../dto/ericssontsl';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/ericssontsl/post';
const uriDateSearch = Constants.apiUrl + '/ericssontsl/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/ericssontsl/downloadCSV";

@Injectable({
  providedIn: 'root'
})

export class EricssontslService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getEricssontslList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getEricssontslById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getEricssontslsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getEricssontslsByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveEricssontsl(ericssontsl: Ericssontsl): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, ericssontsl);
	}

	deleteEricssontsl(ericssontsl: Ericssontsl): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, ericssontsl);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
