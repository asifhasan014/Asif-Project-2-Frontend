import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Padhdisplaydevicepred } from '../dto/padhdisplaydevicepred';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';

const uri = Constants.apiUrl + '/padhdisplaydevice/displaydeviceprediction';

@Injectable({
  providedIn: 'root'
})

export class PadhdisplaydevicepredService {
	constructor(
		private httpbase: HttpbaseService
	) {}
  
	getPadhdisplaydevicepredList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getPadhdisplaydevicepredById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getPadhdisplaydevicepredsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	savePadhdisplaydevicepred(padhdisplaydevicepred: Padhdisplaydevicepred): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, padhdisplaydevicepred);
	}

	deletePadhdisplaydevicepred(padhdisplaydevicepred: Padhdisplaydevicepred): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, padhdisplaydevicepred);	
	}	
}
