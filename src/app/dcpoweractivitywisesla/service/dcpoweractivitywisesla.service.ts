import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Dcpoweractivitywisesla } from '../dto/dcpoweractivitywisesla';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';

const uri = Constants.apiUrl + '/dcpoweractivitywisesla/post';

@Injectable({
  providedIn: 'root'
})

export class DcpoweractivitywiseslaService {
	constructor(
		private httpbase: HttpbaseService
	) {}
  
	getDcpoweractivitywiseslaList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getDcpoweractivitywiseslaById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getDcpoweractivitywiseslasByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	saveDcpoweractivitywisesla(dcpoweractivitywisesla: Dcpoweractivitywisesla): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, dcpoweractivitywisesla);
	}

	deleteDcpoweractivitywisesla(dcpoweractivitywisesla: Dcpoweractivitywisesla): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, dcpoweractivitywisesla);	
	}	
}
