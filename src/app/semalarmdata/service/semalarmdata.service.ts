import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Semalarmdata } from '../dto/semalarmdata';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/semalarmdata/post';
const uriDateSearch = Constants.apiUrl + '/semalarmdata/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/semalarmdata/downloadCSV";

@Injectable({
  providedIn: 'root'
})

export class SemalarmdataService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getSemalarmdataList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getSemalarmdataById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getSemalarmdatasByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getSemalarmdatasByUniqueCodeAndDate(code,ttSequence, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			ttSequence: ttSequence,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveSemalarmdata(semalarmdata: Semalarmdata): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, semalarmdata);
	}

	deleteSemalarmdata(semalarmdata: Semalarmdata): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, semalarmdata);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
