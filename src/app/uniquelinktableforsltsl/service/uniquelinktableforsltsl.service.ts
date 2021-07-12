import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Uniquelinktableforsltsl } from '../dto/uniquelinktableforsltsl';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/uniquelinktableforsltsl/post';
const uriDateSearch = Constants.apiUrl + '/uniquelinktableforsltsl/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/uniquelinktableforsltsl/downloadCSV";

@Injectable({
  providedIn: 'root'
})

export class UniquelinktableforsltslService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getUniquelinktableforsltslList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getUniquelinktableforsltslById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getUniquelinktableforsltslsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getUniquelinktableforsltslsByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveUniquelinktableforsltsl(uniquelinktableforsltsl: Uniquelinktableforsltsl): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, uniquelinktableforsltsl);
	}

	deleteUniquelinktableforsltsl(uniquelinktableforsltsl: Uniquelinktableforsltsl): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, uniquelinktableforsltsl);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
