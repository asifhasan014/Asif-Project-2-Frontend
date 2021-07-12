import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Ldsettlementsiteavailability } from '../dto/ldsettlementsiteavailability';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';

const uri = Constants.apiUrl + '/ldsettlementsiteavailability/post';

@Injectable({
  providedIn: 'root'
})

export class LdsettlementsiteavailabilityService {
	constructor(
		private httpbase: HttpbaseService
	) {}
  
	getLdsettlementsiteavailabilityList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getLdsettlementsiteavailabilityById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getLdsettlementsiteavailabilitysByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	saveLdsettlementsiteavailability(ldsettlementsiteavailability: Ldsettlementsiteavailability): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, ldsettlementsiteavailability);
	}

	deleteLdsettlementsiteavailability(ldsettlementsiteavailability: Ldsettlementsiteavailability): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, ldsettlementsiteavailability);	
	}	
}
