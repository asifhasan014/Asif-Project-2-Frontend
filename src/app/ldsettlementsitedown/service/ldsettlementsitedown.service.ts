import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Ldsettlementsitedown } from '../dto/ldsettlementsitedown';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uriDateSearch = Constants.apiUrl + '/ldsettlementsitedown/searchByUniqueCodeAndDate';
const uri = Constants.apiUrl + '/ldsettlementsitedown/post';
const uriReportDownload=Constants.apiUrl+ "/ldsettlementsitedown/downloadSiteDwondData";
@Injectable({
  providedIn: 'root'
})

export class LdsettlementsitedownService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getLdsettlementsitedownList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getLdsettlementsitedownById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getLdsettlementsitedownsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}

	getLdsettlementsitedownsByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveLdsettlementsitedown(ldsettlementsitedown: Ldsettlementsitedown): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, ldsettlementsitedown);
	}

	deleteLdsettlementsitedown(ldsettlementsitedown: Ldsettlementsitedown): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, ldsettlementsitedown);	
	}	
	downloadReport(code, from, to): Observable<any>{
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		return this.http.post(uriReportDownload, postObj, {responseType: ResponseContentType.Blob});
	}
}
