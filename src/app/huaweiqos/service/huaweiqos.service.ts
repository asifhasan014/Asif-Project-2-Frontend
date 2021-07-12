import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Huaweiqos } from '../dto/huaweiqos';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/huaweiqos/post';
const uriDateSearch = Constants.apiUrl + '/huaweiqos/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/huaweiqos/downloadCSV";

@Injectable({
  providedIn: 'root'
})

export class HuaweiqosService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getHuaweiqosList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getHuaweiqosById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getHuaweiqossByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getHuaweiqossByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveHuaweiqos(huaweiqos: Huaweiqos): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, huaweiqos);
	}

	deleteHuaweiqos(huaweiqos: Huaweiqos): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, huaweiqos);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
