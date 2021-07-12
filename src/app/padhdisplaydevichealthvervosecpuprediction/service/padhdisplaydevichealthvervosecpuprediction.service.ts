import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Padhdisplaydevichealthvervosecpuprediction } from '../dto/padhdisplaydevichealthvervosecpuprediction';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/padhdisplayhealthverbose/cpuusageprediction';
const uriReportDownload=Constants.apiUrl+ "/padhdisplayhealthverbose/downloadhealthverbosecpuusageprediction";
@Injectable({
  providedIn: 'root'
})

export class PadhdisplaydevichealthvervosecpupredictionService {
	constructor(
		private httpbase: HttpbaseService,
		private http:Http
	) {}
  
	getPadhdisplaydevichealthvervosecpupredictionList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getPadhdisplaydevichealthvervosecpupredictionById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getPadhdisplaydevichealthvervosecpupredictionsByUniqueCode(code,days): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri+days,code);
	}
	
	savePadhdisplaydevichealthvervosecpuprediction(padhdisplaydevichealthvervosecpuprediction: Padhdisplaydevichealthvervosecpuprediction): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, padhdisplaydevichealthvervosecpuprediction);
	}

	deletePadhdisplaydevichealthvervosecpuprediction(padhdisplaydevichealthvervosecpuprediction: Padhdisplaydevichealthvervosecpuprediction): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, padhdisplaydevichealthvervosecpuprediction);	
	}

	downloadReportByParam(params:String): Observable<any>{
		return this.http.get(uriReportDownload+params, {responseType: ResponseContentType.Blob});
	}
}
