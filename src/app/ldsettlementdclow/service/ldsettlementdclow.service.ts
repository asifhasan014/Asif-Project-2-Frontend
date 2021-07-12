import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {ResponseContentType,Http} from '@angular/http';

import { Constants } from '../../common';
import { Ldsettlementdclow } from '../dto/ldsettlementdclow';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';

const uri = Constants.apiUrl + '/ldsettlementdclow/post';
const uriReportDownload=Constants.apiUrl+ "ldsettlementdclow/downloadDcLowData";
const uriDateSearch = Constants.apiUrl + '/ldsettlementdclow/searchByUniqueCodeAndDate';
@Injectable({
  providedIn: 'root'
})

export class LdsettlementdclowService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getLdsettlementdclowList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getLdsettlementdclowById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getLdsettlementdclowsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	saveLdsettlementdclow(ldsettlementdclow: Ldsettlementdclow): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, ldsettlementdclow);
	}

	deleteLdsettlementdclow(ldsettlementdclow: Ldsettlementdclow): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, ldsettlementdclow);	
	}
	
	downloadReport(code, ttSequence, from, to): Observable<any>{
		const postObj = {
			uniqueCode: code,
			ttSequence: ttSequence,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		return this.http.post(uriReportDownload, postObj, {responseType: ResponseContentType.Blob});
	}

	getLdsettlementdclowsByUniqueCodeAndDate(code,ttSequence, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			ttSequence: ttSequence,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
}
