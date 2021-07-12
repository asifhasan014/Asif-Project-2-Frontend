import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Dcpowervendor } from '../dto/dcpowervendor';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';

const uri = Constants.apiUrl + '/dcpowervendor/post';

@Injectable({
  providedIn: 'root'
})

export class DcpowervendorService {
	constructor(
		private httpbase: HttpbaseService
	) {}
  
	getDcpowervendorList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getDcpowervendorById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getDcpowervendorsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	saveDcpowervendor(dcpowervendor: Dcpowervendor): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, dcpowervendor);
	}

	deleteDcpowervendor(dcpowervendor: Dcpowervendor): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, dcpowervendor);	
	}	
}
