import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Padhdisplaydevicehealthprediction } from '../dto/padhdisplaydevicehealthprediction';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';
const uri = Constants.apiUrl + '/padhdisplaydevice/displaydeviceprediction';
const uriReportDownload=Constants.apiUrl+ "/padhdisplaydevice/downloaddisplaydevicepredictionreport";

@Injectable({
  providedIn: 'root'
})

export class PadhdisplaydevicehealthpredictionService {
	constructor(
		private httpbase: HttpbaseService,
		private http:Http
	) {}
  
	getPadhdisplaydevicehealthpredictionList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getPadhdisplaydevicehealthpredictionById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getPadhdisplaydevicehealthpredictionsByUniqueCode(code,days): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri+days,code);
	}
	
	savePadhdisplaydevicehealthprediction(padhdisplaydevicehealthprediction: Padhdisplaydevicehealthprediction): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, padhdisplaydevicehealthprediction);
	}

	deletePadhdisplaydevicehealthprediction(padhdisplaydevicehealthprediction: Padhdisplaydevicehealthprediction): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, padhdisplaydevicehealthprediction);	
	}

	downloadReportByParam(params:String): Observable<any>{
		return this.http.get(uriReportDownload+params, {responseType: ResponseContentType.Blob});
	}
}
