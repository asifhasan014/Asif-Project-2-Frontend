import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Soemneinventory } from '../dto/soemneinventory';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/soemneinventory/post';
const uriDateSearch = Constants.apiUrl + '/soemneinventory/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/soemneinventory/downloadCSV";

@Injectable({
  providedIn: 'root'
})

export class SoemneinventoryService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getSoemneinventoryList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getSoemneinventoryById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getSoemneinventorysByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getSoemneinventorysByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveSoemneinventory(soemneinventory: Soemneinventory): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, soemneinventory);
	}

	deleteSoemneinventory(soemneinventory: Soemneinventory): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, soemneinventory);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
