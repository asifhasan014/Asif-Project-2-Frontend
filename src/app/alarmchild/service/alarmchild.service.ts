import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Alarmchild } from '../dto/alarmchild';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/alarmchild/post';
const uriDateSearch = Constants.apiUrl + '/alarmchild/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/alarmchild/downloadCSV";

@Injectable({
  providedIn: 'root'
})

export class AlarmchildService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getAlarmchildList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getAlarmchildById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getAlarmchildsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getAlarmchildsByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveAlarmchild(alarmchild: Alarmchild): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, alarmchild);
	}

	deleteAlarmchild(alarmchild: Alarmchild): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, alarmchild);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
