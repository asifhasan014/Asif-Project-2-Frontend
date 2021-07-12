import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Soemconfigdataminlinktneth } from '../dto/soemconfigdataminlinktneth';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/soemconfigdataminlinktneth/post';
const uriDateSearch = Constants.apiUrl + '/soemconfigdataminlinktneth/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/soemconfigdataminlinktneth/downloadCSV";

@Injectable({
  providedIn: 'root'
})

export class SoemconfigdataminlinktnethService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getSoemconfigdataminlinktnethList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getSoemconfigdataminlinktnethById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getSoemconfigdataminlinktnethsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getSoemconfigdataminlinktnethsByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveSoemconfigdataminlinktneth(soemconfigdataminlinktneth: Soemconfigdataminlinktneth): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, soemconfigdataminlinktneth);
	}

	deleteSoemconfigdataminlinktneth(soemconfigdataminlinktneth: Soemconfigdataminlinktneth): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, soemconfigdataminlinktneth);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
