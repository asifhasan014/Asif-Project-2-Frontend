import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {ResponseContentType,Http} from '@angular/http';

import { Constants } from '../../common';
import { Ldsettlementmainsfailure } from '../dto/ldsettlementmainsfailure';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';

const uri = Constants.apiUrl + '/ldsettlementmainsfailure/post';
const uriReportDownload=Constants.apiUrl+ "ldsettlementmainsfailure/downloadMainsFailureData";
const uriDateSearch = Constants.apiUrl + '/ldsettlementmainsfailure/searchByUniqueCodeAndDate';

@Injectable({
  providedIn: 'root'
})

export class LdsettlementmainsfailureService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getLdsettlementmainsfailureList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getLdsettlementmainsfailureById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getLdsettlementmainsfailuresByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	saveLdsettlementmainsfailure(ldsettlementmainsfailure: Ldsettlementmainsfailure): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, ldsettlementmainsfailure);
	}

	deleteLdsettlementmainsfailure(ldsettlementmainsfailure: Ldsettlementmainsfailure): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, ldsettlementmainsfailure);	
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

	getLdsettlementMainsFailuresByUniqueCodeAndDate(code,ttSequence, from, to): Observable<ApiResponse> {
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
