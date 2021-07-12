import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Ticketassignedgroup } from '../dto/ticketassignedgroup';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/ticketassignedgroup/post';
const uriDateSearch = Constants.apiUrl + '/ticketassignedgroup/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/ticketassignedgroup/downloadCSV";

@Injectable({
  providedIn: 'root'
})

export class TicketassignedgroupService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getTicketassignedgroupList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getTicketassignedgroupById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getTicketassignedgroupsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getTicketassignedgroupsByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveTicketassignedgroup(ticketassignedgroup: Ticketassignedgroup): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, ticketassignedgroup);
	}

	deleteTicketassignedgroup(ticketassignedgroup: Ticketassignedgroup): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, ticketassignedgroup);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
