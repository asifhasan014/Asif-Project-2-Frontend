import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Huaweilicense } from '../dto/huaweilicense';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/huaweilicense/post';
const uriDateSearch = Constants.apiUrl + '/huaweilicense/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/huaweilicense/downloadCSV";

@Injectable({
  providedIn: 'root'
})

export class HuaweilicenseService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getHuaweilicenseList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getHuaweilicenseById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getHuaweilicensesByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getHuaweilicensesByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveHuaweilicense(huaweilicense: Huaweilicense): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, huaweilicense);
	}

	deleteHuaweilicense(huaweilicense: Huaweilicense): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, huaweilicense);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
