import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Ldsettlementexternalalarm } from '../dto/ldsettlementexternalalarm';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/ldsettlementexternalalarm/post';
const uriDateSearch = Constants.apiUrl + '/ldsettlementexternalalarm/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/ldsettlementexternalalarm/downloadCSV";

@Injectable({
  providedIn: 'root'
})

export class LdsettlementexternalalarmService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getLdsettlementexternalalarmList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getLdsettlementexternalalarmById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getLdsettlementexternalalarmsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getLdsettlementexternalalarmsByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveLdsettlementexternalalarm(ldsettlementexternalalarm: Ldsettlementexternalalarm): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, ldsettlementexternalalarm);
	}

	deleteLdsettlementexternalalarm(ldsettlementexternalalarm: Ldsettlementexternalalarm): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, ldsettlementexternalalarm);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
