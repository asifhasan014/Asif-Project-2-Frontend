import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Dcpoweritemwisewarranty } from '../dto/dcpoweritemwisewarranty';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';

const uri = Constants.apiUrl + '/dcpoweritemwisewarranty/post';

@Injectable({
  providedIn: 'root'
})

export class DcpoweritemwisewarrantyService {
	constructor(
		private httpbase: HttpbaseService
	) {}
  
	getDcpoweritemwisewarrantyList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getDcpoweritemwisewarrantyById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getDcpoweritemwisewarrantysByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	saveDcpoweritemwisewarranty(dcpoweritemwisewarranty: Dcpoweritemwisewarranty): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, dcpoweritemwisewarranty);
	}

	deleteDcpoweritemwisewarranty(dcpoweritemwisewarranty: Dcpoweritemwisewarranty): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, dcpoweritemwisewarranty);	
	}	
}
