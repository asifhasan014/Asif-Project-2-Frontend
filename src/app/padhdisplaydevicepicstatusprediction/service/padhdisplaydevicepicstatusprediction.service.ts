import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Padhdisplaydevicepicstatusprediction } from '../dto/padhdisplaydevicepicstatusprediction';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';
const uri = Constants.apiUrl + '/padhdisplaydevicepicstatus/picstatusprediction';
const uriReportDownload=Constants.apiUrl+ "/padhdisplaydevicepicstatus/downloadPicStatusprediction";

@Injectable({
  providedIn: 'root'
})

export class PadhdisplaydevicepicstatuspredictionService {
	constructor(
		private httpbase: HttpbaseService,
		private http:Http
	) {}
  
	getPadhdisplaydevicepicstatuspredictionList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getPadhdisplaydevicepicstatuspredictionById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getPadhdisplaydevicepicstatuspredictionsByUniqueCode(code,days): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri+days,code);
	}
	
	savePadhdisplaydevicepicstatusprediction(padhdisplaydevicepicstatusprediction: Padhdisplaydevicepicstatusprediction): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, padhdisplaydevicepicstatusprediction);
	}

	deletePadhdisplaydevicepicstatusprediction(padhdisplaydevicepicstatusprediction: Padhdisplaydevicepicstatusprediction): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, padhdisplaydevicepicstatusprediction);	
	}

	downloadReportByParam(params:String): Observable<any>{
		return this.http.get(uriReportDownload+params, {responseType: ResponseContentType.Blob});
	}
}
