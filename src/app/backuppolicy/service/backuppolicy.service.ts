import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Backuppolicy } from '../dto/backuppolicy';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';

const uri = Constants.apiUrl + '/backuppolicy/post';

@Injectable({
  providedIn: 'root'
})

export class BackuppolicyService {
	constructor(
		private httpbase: HttpbaseService
	) {}
  
	getBackuppolicyList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getBackuppolicyById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	saveBackuppolicy(backuppolicy: Backuppolicy): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, backuppolicy);
	}

	deleteBackuppolicy(backuppolicy: Backuppolicy): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, backuppolicy);	
	}	
}
