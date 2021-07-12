import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Emsfiledirectoryrepository } from '../dto/emsfiledirectoryrepository';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/emsfiledirectoryrepository/post';
const uriDateSearch = Constants.apiUrl + '/emsfiledirectoryrepository/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/emsfiledirectoryrepository/downloadCSV";
const uriOnDemand = Constants.apiUrl + "/emsfiledirectoryrepository/postOnDemand";
const uriGetDirectory = Constants.apiUrl + '/emsfiledirectoryrepository/getDirectoryList';

@Injectable({
  providedIn: 'root'
})

export class EmsfiledirectoryrepositoryService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getEmsfiledirectoryrepositoryList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getEmsfiledirectoryrepositoryById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getEmsfiledirectoryrepositorysByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getEmsfiledirectoryrepositorysByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveEmsfiledirectoryrepository(emsfiledirectoryrepository: Emsfiledirectoryrepository): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, emsfiledirectoryrepository);
	}

	deleteEmsfiledirectoryrepository(emsfiledirectoryrepository: Emsfiledirectoryrepository): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, emsfiledirectoryrepository);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}

	postSelectedRowDataList(rowData): Observable<ApiResponse> {
		return this.httpbase.postExecuteOnDemandData(uriOnDemand, rowData);
	  }

	getEmsfiledirectoryOnlyDirectoryList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uriGetDirectory);
	}
}
