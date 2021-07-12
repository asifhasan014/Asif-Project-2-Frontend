import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Automationscheduler } from '../dto/automationscheduler';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';

const uri = Constants.apiUrl + '/automationscheduler/post';

@Injectable({
  providedIn: 'root'
})

export class AutomationschedulerService {
	constructor(
		private httpbase: HttpbaseService
	) {}
  
	getAutomationschedulerList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getAutomationschedulerById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getAutomationschedulersByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	saveAutomationscheduler(automationscheduler: Automationscheduler): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, automationscheduler);
	}

	deleteAutomationscheduler(automationscheduler: Automationscheduler): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, automationscheduler);	
	}	
}
