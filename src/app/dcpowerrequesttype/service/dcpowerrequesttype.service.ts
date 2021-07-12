import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Dcpowerrequesttype } from '../dto/dcpowerrequesttype';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/dcpowerrequesttype/post';
const uriDateSearch = Constants.apiUrl + '/dcpowerrequesttype/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/dcpowerrequesttype/downloadCSV";

@Injectable({
  providedIn: 'root'
})

export class DcpowerrequesttypeService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getDcpowerrequesttypeList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getDcpowerrequesttypeById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getDcpowerrequesttypesByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getDcpowerrequesttypesByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveDcpowerrequesttype(dcpowerrequesttype: Dcpowerrequesttype): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, dcpowerrequesttype);
	}

	deleteDcpowerrequesttype(dcpowerrequesttype: Dcpowerrequesttype): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, dcpowerrequesttype);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
