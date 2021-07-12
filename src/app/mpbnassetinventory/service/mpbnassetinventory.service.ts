import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Mpbnassetinventory } from '../dto/mpbnassetinventory';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';

const uri = Constants.apiUrl + '/mpbnassetinventory/post';

@Injectable({
  providedIn: 'root'
})

export class MpbnassetinventoryService {
	constructor(
		private httpbase: HttpbaseService
	) {}
  
	getMpbnassetinventoryList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getMpbnassetinventoryById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getMpbnassetinventorysByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	saveMpbnassetinventory(mpbnassetinventory: Mpbnassetinventory): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, mpbnassetinventory);
	}

	deleteMpbnassetinventory(mpbnassetinventory: Mpbnassetinventory): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, mpbnassetinventory);	
	}	

	getMpbnassetinventoryListByType(type :any): Observable<ApiResponse> {
		const postObj = {
			deviceType: type,
		   operation: Constants.GetDeviceByType
	   	};
		return this.httpbase.postData(uri,postObj);
	}
}
