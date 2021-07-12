import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Ericssonlicensefalmoduleinventory } from '../dto/ericssonlicensefalmoduleinventory';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/ericssonlicensefalmoduleinventory/post';
const uriDateSearch = Constants.apiUrl + '/ericssonlicensefalmoduleinventory/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/ericssonlicensefalmoduleinventory/downloadCSV";

@Injectable({
  providedIn: 'root'
})

export class EricssonlicensefalmoduleinventoryService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getEricssonlicensefalmoduleinventoryList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getEricssonlicensefalmoduleinventoryById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getEricssonlicensefalmoduleinventorysByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getEricssonlicensefalmoduleinventorysByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveEricssonlicensefalmoduleinventory(ericssonlicensefalmoduleinventory: Ericssonlicensefalmoduleinventory): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, ericssonlicensefalmoduleinventory);
	}

	deleteEricssonlicensefalmoduleinventory(ericssonlicensefalmoduleinventory: Ericssonlicensefalmoduleinventory): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, ericssonlicensefalmoduleinventory);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
