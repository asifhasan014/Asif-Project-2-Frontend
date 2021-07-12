import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Configurablecategory } from '../dto/configurablecategory';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/configurablecategory/post';
const uriDateSearch = Constants.apiUrl + '/configurablecategory/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/configurablecategory/downloadCSV";

@Injectable({
  providedIn: 'root'
})

export class ConfigurablecategoryService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getConfigurablecategoryList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getConfigurablecategoryById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getConfigurablecategorysByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getConfigurablecategorysByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveConfigurablecategory(configurablecategory: Configurablecategory): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, configurablecategory);
	}

	deleteConfigurablecategory(configurablecategory: Configurablecategory): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, configurablecategory);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
