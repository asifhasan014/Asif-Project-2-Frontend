import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Functioncode } from '../dto/functioncode';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';

const uri = Constants.apiUrl + '/feature/post';

@Injectable({
  providedIn: 'root'
})

export class FunctioncodeService {
	constructor(
		private httpbase: HttpbaseService
	) {}
  
	getFunctioncodeList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getFunctioncodeById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	saveFunctioncode(usr: Functioncode): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, usr);
	}

	deleteFunctioncode(usr: Functioncode): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, usr);	
	}	
}
