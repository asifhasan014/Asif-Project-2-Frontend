import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Backupcalendar } from '../dto/backupcalendar';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';

const uri = Constants.apiUrl + '/backupcalendar/post';

@Injectable({
  providedIn: 'root'
})

export class BackupcalendarService {
	constructor(
		private httpbase: HttpbaseService
	) {}
  
	getBackupcalendarList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getBackupcalendarById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	saveBackupcalendar(backupcalendar: Backupcalendar): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, backupcalendar);
	}

	deleteBackupcalendar(backupcalendar: Backupcalendar): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, backupcalendar);	
	}	
}
