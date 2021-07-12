import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Audittrail } from '../dto/audittrail';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';

const uri = Constants.apiUrl + '/audittrail/post';

@Injectable({
  providedIn: 'root'
})

export class AudittrailService {
	constructor(
		private httpbase: HttpbaseService
	) {}
  
	getAudittrailList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getAudittrailById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	saveAudittrail(audittrail: Audittrail): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, audittrail);
	}

	deleteAudittrail(audittrail: Audittrail): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, audittrail);	
	}	
}
