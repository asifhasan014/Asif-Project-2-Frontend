import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Ericssonrsl } from '../dto/ericssonrsl';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/ericssonrsl/post';
const uriDateSearch = Constants.apiUrl + '/ericssonrsl/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/ericssonrsl/downloadCSV";

@Injectable({
  providedIn: 'root'
})

export class EricssonrslService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getEricssonrslList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getEricssonrslById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getEricssonrslsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getEricssonrslsByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveEricssonrsl(ericssonrsl: Ericssonrsl): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, ericssonrsl);
	}

	deleteEricssonrsl(ericssonrsl: Ericssonrsl): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, ericssonrsl);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
