import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {ResponseContentType,Http} from '@angular/http';

import { Constants } from '../../common';
import { Ldsettlementpg } from '../dto/ldsettlementpg';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';

const uri = Constants.apiUrl + '/ldsettlementpg/post';
const uriReportDownload=Constants.apiUrl+ "ldsettlementpg/downloadPgData";
const uriDateSearch = Constants.apiUrl + '/ldsettlementpg/searchByUniqueCodeAndDate';


@Injectable({
  providedIn: 'root'
})

export class LdsettlementpgService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getLdsettlementpgList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getLdsettlementpgById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getLdsettlementpgsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	saveLdsettlementpg(ldsettlementpg: Ldsettlementpg): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, ldsettlementpg);
	}

	deleteLdsettlementpg(ldsettlementpg: Ldsettlementpg): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, ldsettlementpg);	
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

	getLdsettlementPgsByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
}
