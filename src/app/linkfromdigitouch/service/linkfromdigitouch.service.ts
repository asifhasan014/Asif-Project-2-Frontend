import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Linkfromdigitouch } from '../dto/linkfromdigitouch';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/linkfromdigitouch/post';
const uriDateSearch = Constants.apiUrl + '/linkfromdigitouch/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/linkfromdigitouch/downloadCSV";

@Injectable({
  providedIn: 'root'
})

export class LinkfromdigitouchService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getLinkfromdigitouchList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getLinkfromdigitouchById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getLinkfromdigitouchsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getLinkfromdigitouchsByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveLinkfromdigitouch(linkfromdigitouch: Linkfromdigitouch): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, linkfromdigitouch);
	}

	deleteLinkfromdigitouch(linkfromdigitouch: Linkfromdigitouch): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, linkfromdigitouch);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
