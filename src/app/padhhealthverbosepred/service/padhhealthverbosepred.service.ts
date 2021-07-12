import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Padhhealthverbosepred } from '../dto/padhhealthverbosepred';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/padhdisplayhealthverbose/healthVerbosePredictionOne';
const uriReportDownload=Constants.apiUrl+ "/padhdisplayhealthverbose/downloadhealthverbosememoryusageprediction";

@Injectable({
  providedIn: 'root'
})

export class PadhhealthverbosepredService {
	constructor(
		private httpbase: HttpbaseService,
		private http:Http
	) {}
  
	getPadhhealthverbosepredList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getPadhhealthverbosepredById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getPadhhealthverbosepredsByUniqueCode(code,days): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri+days,code);
	}
	
	savePadhhealthverbosepred(padhhealthverbosepred: Padhhealthverbosepred): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, padhhealthverbosepred);
	}

	deletePadhhealthverbosepred(padhhealthverbosepred: Padhhealthverbosepred): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, padhhealthverbosepred);	
	}

	downloadReportByParam(params:String): Observable<any>{
		return this.http.get(uriReportDownload+params, {responseType: ResponseContentType.Blob});
	}
}
