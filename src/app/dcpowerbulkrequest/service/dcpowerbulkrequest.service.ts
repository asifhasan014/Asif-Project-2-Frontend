import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Dcpowerbulkrequest } from '../dto/dcpowerbulkrequest';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/dcpowerbulkrequest/post';
const uriDateSearch = Constants.apiUrl + '/dcpowerbulkrequest/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/dcpowerbulkrequest/downloadCSV";
const apiUrl = Constants.apiUrl+ "/dcpowerbulkrequest/postData";

@Injectable({
  providedIn: 'root'
})

export class DcpowerbulkrequestService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getDcpowerbulkrequestList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getDcpowerbulkrequestById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getDcpowerbulkrequestsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getDcpowerbulkrequestsByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveDcpowerbulkrequest(dcpowerbulkrequest: Dcpowerbulkrequest): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, dcpowerbulkrequest);
	}

	deleteDcpowerbulkrequest(dcpowerbulkrequest: Dcpowerbulkrequest): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, dcpowerbulkrequest);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
	sendDcpowerBulkRequestData(ArrayList){
		return this.httpbase.postData(apiUrl, ArrayList);
	}
}
