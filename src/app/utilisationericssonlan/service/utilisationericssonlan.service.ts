import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Utilisationericssonlan } from '../dto/utilisationericssonlan';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/utilisationericssonlan/post';
const uriDateSearch = Constants.apiUrl + '/utilisationericssonlan/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/utilisationericssonlan/downloadCSV";

@Injectable({
  providedIn: 'root'
})

export class UtilisationericssonlanService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getUtilisationericssonlanList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getUtilisationericssonlanById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getUtilisationericssonlansByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getUtilisationericssonlansByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveUtilisationericssonlan(utilisationericssonlan: Utilisationericssonlan): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, utilisationericssonlan);
	}

	deleteUtilisationericssonlan(utilisationericssonlan: Utilisationericssonlan): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, utilisationericssonlan);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
