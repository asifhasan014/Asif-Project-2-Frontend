import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Warrantysupportclaim } from '../dto/warrantysupportclaim';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';

const uri = Constants.apiUrl + '/warrantysupportclaim/post';

@Injectable({
  providedIn: 'root'
})

export class WarrantysupportclaimService {
	constructor(
		private httpbase: HttpbaseService
	) {}
  
	getWarrantysupportclaimList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getWarrantysupportclaimById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getWarrantysupportclaimsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	saveWarrantysupportclaim(warrantysupportclaim: Warrantysupportclaim): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, warrantysupportclaim);
	}

	deleteWarrantysupportclaim(warrantysupportclaim: Warrantysupportclaim): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, warrantysupportclaim);	
	}	
}
