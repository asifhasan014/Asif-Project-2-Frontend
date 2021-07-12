import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Ldsettlementgensetonloadreport } from '../dto/ldsettlementgensetonloadreport';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/ldsettlementgensetonloadreport/post';
const uriDateSearch = Constants.apiUrl + '/ldsettlementgensetonloadreport/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/ldsettlementgensetonloadreport/downloadCSV";

@Injectable({
  providedIn: 'root'
})

export class LdsettlementgensetonloadreportService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getLdsettlementgensetonloadreportList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getLdsettlementgensetonloadreportById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getLdsettlementgensetonloadreportsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getLdsettlementgensetonloadreportsByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveLdsettlementgensetonloadreport(ldsettlementgensetonloadreport: Ldsettlementgensetonloadreport): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, ldsettlementgensetonloadreport);
	}

	deleteLdsettlementgensetonloadreport(ldsettlementgensetonloadreport: Ldsettlementgensetonloadreport): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, ldsettlementgensetonloadreport);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
