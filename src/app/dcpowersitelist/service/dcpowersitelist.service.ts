import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Dcpowersitelist } from '../dto/dcpowersitelist';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';

const uri = Constants.apiUrl + '/dcpowersitelist/post';

@Injectable({
  providedIn: 'root'
})

export class DcpowersitelistService {
	constructor(
		private httpbase: HttpbaseService
	) {}
  
	getDcpowersitelistList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getDcpowersitelistById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getDcpowersitelistsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	saveDcpowersitelist(dcpowersitelist: Dcpowersitelist): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, dcpowersitelist);
	}

	deleteDcpowersitelist(dcpowersitelist: Dcpowersitelist): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, dcpowersitelist);	
	}	
}
