import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Ericssonlicensemoduleinventory } from '../dto/ericssonlicensemoduleinventory';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/ericssonlicensemoduleinventory/post';
const uriDateSearch = Constants.apiUrl + '/ericssonlicensemoduleinventory/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/ericssonlicensemoduleinventory/downloadCSV";

@Injectable({
  providedIn: 'root'
})

export class EricssonlicensemoduleinventoryService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getEricssonlicensemoduleinventoryList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getEricssonlicensemoduleinventoryById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getEricssonlicensemoduleinventorysByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getEricssonlicensemoduleinventorysByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveEricssonlicensemoduleinventory(ericssonlicensemoduleinventory: Ericssonlicensemoduleinventory): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, ericssonlicensemoduleinventory);
	}

	deleteEricssonlicensemoduleinventory(ericssonlicensemoduleinventory: Ericssonlicensemoduleinventory): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, ericssonlicensemoduleinventory);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
