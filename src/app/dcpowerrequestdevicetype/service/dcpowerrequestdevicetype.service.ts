import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Dcpowerrequestdevicetype } from '../dto/dcpowerrequestdevicetype';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/dcpowerrequestdevicetype/post';
const uriDateSearch = Constants.apiUrl + '/dcpowerrequestdevicetype/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/dcpowerrequestdevicetype/downloadCSV";

@Injectable({
  providedIn: 'root'
})

export class DcpowerrequestdevicetypeService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getDcpowerrequestdevicetypeList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getDcpowerrequestdevicetypeById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getDcpowerrequestdevicetypesByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getDcpowerrequestdevicetypesByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveDcpowerrequestdevicetype(dcpowerrequestdevicetype: Dcpowerrequestdevicetype): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, dcpowerrequestdevicetype);
	}

	deleteDcpowerrequestdevicetype(dcpowerrequestdevicetype: Dcpowerrequestdevicetype): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, dcpowerrequestdevicetype);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
