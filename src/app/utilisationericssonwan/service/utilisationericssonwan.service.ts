import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Utilisationericssonwan } from '../dto/utilisationericssonwan';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/utilisationericssonwan/post';
const uriDateSearch = Constants.apiUrl + '/utilisationericssonwan/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/utilisationericssonwan/downloadCSV";

@Injectable({
  providedIn: 'root'
})

export class UtilisationericssonwanService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getUtilisationericssonwanList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getUtilisationericssonwanById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getUtilisationericssonwansByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getUtilisationericssonwansByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveUtilisationericssonwan(utilisationericssonwan: Utilisationericssonwan): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, utilisationericssonwan);
	}

	deleteUtilisationericssonwan(utilisationericssonwan: Utilisationericssonwan): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, utilisationericssonwan);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
