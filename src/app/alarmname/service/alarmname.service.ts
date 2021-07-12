import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Alarmname } from '../dto/alarmname';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/alarmname/post';
const uriDateSearch = Constants.apiUrl + '/alarmname/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/alarmname/downloadCSV";
const uriForAlarmTypeList = Constants.apiUrl + '/alarmname/getAlarmType';

@Injectable({
  providedIn: 'root'
})

export class AlarmnameService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getAlarmnameList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getAlarmTypeList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uriForAlarmTypeList);
	}

	getAlarmnameById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getAlarmnamesByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getAlarmnamesByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveAlarmname(alarmname: Alarmname): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, alarmname);
	}

	deleteAlarmname(alarmname: Alarmname): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, alarmname);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
