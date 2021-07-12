import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Automationwiseschedulerconfiguration } from '../dto/automationwiseschedulerconfiguration';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';

const uri = Constants.apiUrl + '/automationwiseschedulerconfiguration/post';

@Injectable({
  providedIn: 'root'
})

export class AutomationwiseschedulerconfigurationService {
	constructor(
		private httpbase: HttpbaseService
	) {}
  
	getAutomationwiseschedulerconfigurationList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getAutomationwiseschedulerconfigurationById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getAutomationwiseschedulerconfigurationsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	saveAutomationwiseschedulerconfiguration(automationwiseschedulerconfiguration: Automationwiseschedulerconfiguration): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, automationwiseschedulerconfiguration);
	}

	deleteAutomationwiseschedulerconfiguration(automationwiseschedulerconfiguration: Automationwiseschedulerconfiguration): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, automationwiseschedulerconfiguration);	
	}	
}
