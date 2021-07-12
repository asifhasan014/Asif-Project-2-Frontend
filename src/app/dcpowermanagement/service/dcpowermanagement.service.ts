import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Dcpowermanagement } from '../dto/dcpowermanagement';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';
import { DcPowerSearchParamDTO } from '../dto/DcPowerSearchParamDTO';


const uri = Constants.apiUrl + '/dcpowermanagement/post';
const uriReportDownload = Constants.apiUrl + '/dcpowermanagement/downloadCSV';
const uriReqId = Constants.apiUrl + '/dcpowermanagement/getworkrequestid';
const uriForDataValidation = Constants.apiUrl + '/dcpowermanagement/getalldcpower';

@Injectable({
  providedIn: 'root'
})

export class DcpowermanagementService {
	constructor(
		private httpbase: HttpbaseService,
		private http: Http
	) {}
  
	getDcpowermanagementList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getDcpowermanagementById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getDcpowermanagementsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	saveDcpowermanagement(dcpowermanagement: Dcpowermanagement): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, dcpowermanagement);
	}

	getWorkReqID(): Observable<ApiResponse>{
		return this.httpbase.getData(uriReqId);
	}

	getDcpowermanagementListUserWise(inputPeram: DcPowerSearchParamDTO): Observable<ApiResponse> {
		return this.httpbase.getEntityListBySearchPeram(uriForDataValidation, inputPeram);		
	}

	deleteDcpowermanagement(dcpowermanagement: Dcpowermanagement): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, dcpowermanagement);	
	}	
	downloadReport(): Observable<any>{
		return this.http.get(uriReportDownload, {responseType: ResponseContentType.Blob});
	}
}
