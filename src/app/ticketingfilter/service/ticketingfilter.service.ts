import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Ticketingfilter } from '../dto/ticketingfilter';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/ticketingfilter/post';
const uriDateSearch = Constants.apiUrl + '/ticketingfilter/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/ticketingfilter/downloadCSV";

@Injectable({
  providedIn: 'root'
})

export class TicketingfilterService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getTicketingfilterList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getTicketingfilterById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getTicketingfiltersByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getTicketingfiltersByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveTicketingfilter(ticketingfilter: Ticketingfilter): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, ticketingfilter);
	}

	deleteTicketingfilter(ticketingfilter: Ticketingfilter): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, ticketingfilter);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
