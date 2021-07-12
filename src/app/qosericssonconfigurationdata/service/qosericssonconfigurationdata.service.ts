import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Qosericssonconfigurationdata } from '../dto/qosericssonconfigurationdata';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/qosericssonconfigurationdata/post';
const uriDateSearch = Constants.apiUrl + '/qosericssonconfigurationdata/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/qosericssonconfigurationdata/downloadCSV";

@Injectable({
  providedIn: 'root'
})

export class QosericssonconfigurationdataService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getQosericssonconfigurationdataList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getQosericssonconfigurationdataById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getQosericssonconfigurationdatasByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getQosericssonconfigurationdatasByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveQosericssonconfigurationdata(qosericssonconfigurationdata: Qosericssonconfigurationdata): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, qosericssonconfigurationdata);
	}

	deleteQosericssonconfigurationdata(qosericssonconfigurationdata: Qosericssonconfigurationdata): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, qosericssonconfigurationdata);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
