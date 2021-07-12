import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {ResponseContentType,Http} from '@angular/http';

import { Constants } from '../../common';
import { Sitewisedcavailabilityandldvalue } from '../dto/sitewisedcavailabilityandldvalue';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';

const uri = Constants.apiUrl + '/sitewisedcavailabilityandldvalue/post';
const uriReportDownload=Constants.apiUrl+ "sitewisedcavailabilityandldvalue/downloadSiteWiseDcAvailabilityAndLdValueData";

@Injectable({
  providedIn: 'root'
})

export class SitewisedcavailabilityandldvalueService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getSitewisedcavailabilityandldvalueList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getSitewisedcavailabilityandldvalueById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getSitewisedcavailabilityandldvaluesByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	saveSitewisedcavailabilityandldvalue(sitewisedcavailabilityandldvalue: Sitewisedcavailabilityandldvalue): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, sitewisedcavailabilityandldvalue);
	}

	deleteSitewisedcavailabilityandldvalue(sitewisedcavailabilityandldvalue: Sitewisedcavailabilityandldvalue): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, sitewisedcavailabilityandldvalue);	
	}	

	downloadReport(code, from, to): Observable<any>{
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		return this.http.post(uriReportDownload, postObj, {responseType: ResponseContentType.Blob});
	}
}
