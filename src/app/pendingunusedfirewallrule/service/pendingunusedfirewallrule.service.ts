import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Pendingunusedfirewallrule } from '../dto/pendingunusedfirewallrule';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';

const uri = Constants.apiUrl + '/pendingunusedfirewallrule/post';
const uriFromView = Constants.apiUrl + '/pendingunusedfirewallrule/getUnusedDataFromView';

@Injectable({
  providedIn: 'root'
})

export class PendingunusedfirewallruleService {
	constructor(
		private httpbase: HttpbaseService
	) {}
  
	getPendingunusedfirewallruleList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getPendingunusedfirewallruleById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getPendingunusedfirewallrulesByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uriFromView,code);	
	}
	
	savePendingunusedfirewallrule(pendingunusedfirewallrule: Pendingunusedfirewallrule): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, pendingunusedfirewallrule);
	}

	deletePendingunusedfirewallrule(pendingunusedfirewallrule: Pendingunusedfirewallrule): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, pendingunusedfirewallrule);	
	}	
}
