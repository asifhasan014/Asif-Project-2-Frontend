import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Padhdisplaydevicepicstatus } from '../dto/padhdisplaydevicepicstatus';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {Http, ResponseContentType} from '@angular/http';

const uri = Constants.apiUrl + '/padhdisplaydevicepicstatus/post';
const uriOnDemand = Constants.apiUrl + "/padhdisplaydevicepicstatus/postOnDemand";
const uriReportDownload=Constants.apiUrl+ "/padhdisplaydevicepicstatus/downloadPicReportCSV";

@Injectable({
  providedIn: 'root'
})

export class PadhdisplaydevicepicstatusService {
	constructor(
		private httpbase: HttpbaseService,
		private http: Http
	) {}
  
	getPadhdisplaydevicepicstatusList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getPadhdisplaydevicepicstatusById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getPadhdisplaydevicepicstatussByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	savePadhdisplaydevicepicstatus(padhdisplaydevicepicstatus: Padhdisplaydevicepicstatus): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, padhdisplaydevicepicstatus);
	}

	deletePadhdisplaydevicepicstatus(padhdisplaydevicepicstatus: Padhdisplaydevicepicstatus): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, padhdisplaydevicepicstatus);	
	}

	postSelectedRowDataList(rowData): Observable<ApiResponse> {
		return this.httpbase.postExecuteOnDemandData(uriOnDemand, rowData);
	  }
	
	getExecutedCommandOutput(): Observable<ApiResponse> {
		return this.httpbase.getData(uri);
	}

    downloadReport(): Observable<any>{
	 return this.http.get(uriReportDownload, {responseType: ResponseContentType.Blob});
	}
	downloadReportByParam(params:String): Observable<any>{
		return this.http.get(uriReportDownload+params, {responseType: ResponseContentType.Blob});
	}
	
	
}
