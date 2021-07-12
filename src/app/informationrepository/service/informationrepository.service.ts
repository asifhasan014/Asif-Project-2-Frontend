import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Informationrepository } from '../dto/informationrepository';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/informationrepository/post';
const uriDateSearch = Constants.apiUrl + '/informationrepository/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/informationrepository/downloadCSV";

@Injectable({
  providedIn: 'root'
})

export class InformationrepositoryService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getInformationrepositoryList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getInformationrepositoryById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getInformationrepositorysByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getInformationrepositorysByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveInformationrepository(informationrepository: Informationrepository): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, informationrepository);
	}

	deleteInformationrepository(informationrepository: Informationrepository): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, informationrepository);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
