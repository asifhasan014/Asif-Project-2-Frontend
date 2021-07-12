import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Fsadisplayfirewallsession } from '../dto/fsadisplayfirewallsession';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/fsadisplayfirewallsession/post';
const uriReportDownload=Constants.apiUrl+ "/fsadisplayfirewallsession/downloadCSV";
const uriOnDemand = Constants.apiUrl + "/fsadisplayfirewallsession/postOnDemand";
const uriReportDownloadFirewallSession=Constants.apiUrl+ "/fsadisplayfirewallsession/downloadCSVForFirewallSession";
@Injectable({
  providedIn: 'root'
})

export class FsadisplayfirewallsessionService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getFsadisplayfirewallsessionList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getFsadisplayfirewallsessionById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getFsadisplayfirewallsessionsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	saveFsadisplayfirewallsession(fsadisplayfirewallsession: Fsadisplayfirewallsession): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, fsadisplayfirewallsession);
	}

	deleteFsadisplayfirewallsession(fsadisplayfirewallsession: Fsadisplayfirewallsession): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, fsadisplayfirewallsession);	
	}

	downloadReport(): Observable<any>{
		return this.http.get(uriReportDownload, {responseType: ResponseContentType.Blob});
	}
	downloadReportByParam(params:String): Observable<any>{
		return this.http.get(uriReportDownload+params, {responseType: ResponseContentType.Blob});
	}
	postSelectedRowDataList(rowData): Observable<ApiResponse> {
		return this.httpbase.postExecuteOnDemandData(uriOnDemand, rowData);
	  }
	  downloadFirewallSessionDataReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownloadFirewallSession+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
